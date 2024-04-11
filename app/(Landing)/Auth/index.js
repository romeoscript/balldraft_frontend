import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useRef, useEffect, useCallback, useMemo, useState } from 'preact/hooks'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import moment from 'moment'
import PNFO from 'jlinc-shared/PNFO'

import classNames from 'lib/classNames'
import { setPageTitle } from 'lib/Page'
import isMobile from 'lib/isMobile'
import useFirstRender from 'lib/useFirstRender'
import useToggle from 'lib/useToggleHook'
import usePageHasFocus from 'lib/usePageHasFocusHook'
import useOnResize from 'lib/useOnResizeHook'
import { useLocalStorage } from 'lib/storageHooks'
import {
  usePublicProfiles,
  useMyPublicProfile,
  useMutedUsers,
  useAcceptedMembershipsForOrganization,
  useMyOrganizationMembership,
} from 'lib/membershipAppStateHooks'
import {
  countUnreadMessages,
  useOrganizationChatSynopsis,
  useCreateChatChannel,
  useChatChannel,
  useFasterChatPolling,
} from 'lib/chatHooks'
import useUploadAssets from 'lib/uploadAssetsHook'
import useOnDOMChange from 'lib/useOnDOMChangeHook'
import useForceUpdate from 'lib/useForceUpdate'
import { publicProfileToDisplayName } from 'lib/publicProfiles'
import useOnlineStatus from 'lib/useOnlineStatusHook'
import { publicProfileToPathname } from 'lib/publicProfiles'
import { replaceLocation } from 'resources/location'

import ContentBox from 'components/ContentBox'
import Link from 'components/Link'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Subtext from 'components/Subtext'
import IconButton from 'components/IconButton'
import InterfaceHelp from 'components/InterfaceHelp'
import Header from 'components/Header'
import Spinner from 'components/Spinner'
import FileSize from 'components/FileSize'
import Loading from 'components/Loading'
import ErrorMessage from 'components/ErrorMessage'
import Form from 'components/Form'
import EndUserAvatar from 'components/EndUserAvatar'
import EndUserAvatarStack from 'components/EndUserAvatarStack'
import TextArea from 'components/TextArea'
import WYSIWYGContent from 'components/WYSIWYGContent'
import PlainText from 'components/PlainText'
import FilesUploadDroparea from 'components/FilesUploadDroparea'
import Letterbox from 'components/Letterbox'
import FileButton from 'components/FileButton'
import NewChatModal from 'components/NewChatModal'
import EndUserDisplayNameList from 'components/EndUserDisplayNameList'
import ChatChannelAvatar from 'components/ChatChannelAvatar'
import ChatChannelListMember from 'components/ChatChannelListMember'
import Timestamp from 'components/Timestamp'
import LinkToPublicProfile from 'components/LinkToPublicProfile'
import './index.sass'
import Picker from 'emoji-picker-react'
import RemoveButton from 'components/RemoveButton'
import { useUrlPreviews } from 'lib/feedPostHooks'
import { findUrls } from 'lib/urlHelpers'
import ChatUrlPreview from 'components/ChatUrlPreview'
import ChatMessageDeletionModal from 'components/ChatMessageDeletionModal'

export default function OrganizationChatPage({
  params: { channel }, organization, organizationApikey,
}) {
  return <div className="OrganizationChatPage">
    <ChatContentBox {...{
      organization,
      organizationApikey,
      channelParam: channel,
    }} />
  </div>
}


function ChatContentBox({ organization, channelParam }) {
  const chatHref = channel => `/${organization.apikey}/chat` + (channel ? `/${channel}` : '')

  let currentChat = channelParam && (
    (channelParam.match(/^[0-9a-f]{32}$/i)) ? { chatChannelUid: channelParam } :
    (channelParam.startsWith('did:')) ? { dm: channelParam } : undefined
  )

  const { myPublicProfile } = useMyPublicProfile('OrganizationChatPage')

  const [
    isNewChatModalOpen,
    openNewChatModal,
    closeNewChatModal,
  ] = useToggle(false)

  const {
    organizationChatSynopsis: synopsis,
  } = useOrganizationChatSynopsis(organization.apikey, 'OrganizationChatPage')
  useFasterChatPolling('OrganizationChatPage')

  const matchingChatChannel = (
    synopsis &&
    currentChat &&
    currentChat.dm &&
    currentChat.dm !== myPublicProfile.did &&
    findDMChatChannel(synopsis, currentChat.dm)
  )

  if (matchingChatChannel)
    currentChat = { chatChannelUid: matchingChatChannel.uid }

  const loading = (!synopsis || matchingChatChannel)

  useEffect(
    () => {
      if (currentChat && currentChat.dm === myPublicProfile.did)
        replaceLocation(chatHref())
      else if (matchingChatChannel)
        replaceLocation(chatHref(matchingChatChannel.uid))
    },
    [channelParam]
  )

  const totalUnread = useMemo(
    () => synopsis ? countUnreadMessages(synopsis) : 0,
    [synopsis]
  )
  setPageTitle(`${totalUnread > 0 ? `❗${totalUnread} ` : ''}DMs - ${APP_NAME}`)

  return <Fragment>
    <NewChatModal {...{
      open: isNewChatModalOpen,
      onClose: closeNewChatModal,
      organizationApikey: organization.apikey,
    }} />
    <ContentBox
      className="OrganizationChatPage-ChatContentBox"
      x-open={!!currentChat}
    >
      <div className="OrganizationChatPage-left">
        <div className="OrganizationChatPage-header">
          <Icon type="messages" size="lg" />
          <Header size="lg">Chat</Header>
          <InterfaceHelp {...{
            title: 'Direct Message Group Chat',
            content: `Create a direct message group with any other members of this ${PNFO.singular}`,
          }}>
            <IconButton
              className="OrganizationChatPage-openNewChat"
              onClick={openNewChatModal}
              type="create"
            />
          </InterfaceHelp>
        </div>
        <div className="OrganizationChatPage-Chats">
          <ChatsList {...{
            chatHref,
            myPublicProfile,
            organization,
            synopsis,
            currentChat,
          }} />
        </div>
      </div>
      <div className="OrganizationChatPage-right">
        <CurrentChat {...{
          key: `${channelParam}`,
          loading,
          organization,
          myPublicProfile,
          synopsis,
          currentChat,
          openNewChatModal,

        }} />
      </div>
    </ContentBox>
  </Fragment>
}

function ChatsList({
  chatHref,
  myPublicProfile,
  organization,
  synopsis = [],
  currentChat,
}) {
  const firstRender = useFirstRender()

  const chats = synopsis
    .map(chatChannel => ({
      ...chatChannel,
      key: chatChannel.uid,
      href: chatHref(chatChannel.uid),
      selected: currentChat && currentChat.chatChannelUid === chatChannel.uid,
    }))
    .sort((a, b) => {
      a = (a.latestAt || a.createdAt)
      b = (b.latestAt || b.createdAt)
      return a < b ? 1 : a > b ? -1 : 0
    })

  if (currentChat && currentChat.dm) {
    chats.unshift({
      key: 'newDMChatChannel',
      type: 'dm',
      unread: 0,
      createdAt: new Date(),
      selected: true,
      href: `${global.location}`,
      memberUserDids: [currentChat.dm],
    })
  }

  const selectedIndex = chats.findIndex(chat => chat.selected)
  const rootRef = useRef()
  useEffect(
    () => {
      const node = rootRef.current.base
      const scrollTo = top =>
        node.scrollTo({ top, behavior: firstRender ? undefined : 'smooth' })
      const selected = node.querySelector('.OrganizationChatPage-ChatListMember-selected')
      if (selected) {
        const { offsetTop, offsetHeight } = selected
        const { clientHeight, scrollTop } = node
        if (offsetTop < scrollTop || offsetTop > (scrollTop + clientHeight)) {
          scrollTo(offsetTop - (clientHeight / 3) + (offsetHeight / 2))
        }
      } else {
        scrollTo(0)
      }
    },
    [selectedIndex]
  )

  return <TransitionGroup ref={rootRef} className="OrganizationChatPage-ChatsList">
    {chats.map(chatChannel =>
      <CSSTransition
        key={chatChannel.key}
        timeout={200}
        classNames="OrganizationChatPage-ChatsList-transition"
      >
        {h(
          chatChannel.type === 'general' ? GeneralChatListMember : DMChatListMember,
          { ...chatChannel, myPublicProfile, organization },
        )}
      </CSSTransition>
    )}
  </TransitionGroup>
}

function GeneralChatListMember({ organization, ...props }) {
  return <ChatListMember {...{
    ...props,
    organization,
    name: organization.name,
    avatar: <ChatChannelAvatar size="sm" value="#" />
  }} />
}

function DMChatListMember({
  organization,
  memberUserDids,
  myPublicProfile,
  ...props
}) {
  const otherUserDids = memberUserDids.filter(did => did !== myPublicProfile.did)
  const { publicProfiles } = usePublicProfiles(otherUserDids, 'OrganizationChatPage')

  const {
    chatChannel,
  } = useChatChannel(props.uid, null, 'OrganizationChatPage')


  return <ChatListMember {...{
    ...props,
    organization,
    myPublicProfile,
    name: chatChannel.name || <EndUserDisplayNameList noLinks {...{
      publicProfiles, asMembersOf: organization.apikey
    }} />,
    avatar: <EndUserAvatarStack {...{ publicProfiles, size: 'sm' }} />,
  }} />
}

function ChatListMember({
  unread = 0,
  latestAt,
  preview,
  selected,
  href,
  avatar,
  name,
}) {
  return <ChatChannelListMember {...{
    className: classNames('OrganizationChatPage-ChatListMember', { selected, unread }),
    date: latestAt,
    preview,
    avatar,
    name,
    href,
    badge: <Icon
      blue
      type="circle"
      size="sm"
      className="OrganizationChatPage-ChatListMember-unreadBadge"
    />,
  }} />
}


function CurrentChat({ synopsis, currentChat, ...props }) {


  if (!synopsis)
    return <Loading type="block" />
  const chatChannelDetails = synopsis.find(channel => channel.uid === currentChat?.chatChannelUid)
  const chatChannelType = chatChannelDetails ? chatChannelDetails.type : null
  if (currentChat && currentChat.dm)

    return <NewDMChatChannel {...{
      ...props,
      synopsis,
      memberUserDids: [currentChat.dm],
    }} />

  if (currentChat && currentChat.chatChannelUid)
    return <ChatChannel {...{
      ...props,
      synopsis,
      chatChannelSynopsis: synopsis.find(s => s.uid === currentChat.chatChannelUid),
      chatChannelUid: currentChat.chatChannelUid,
      chatChannelType,
    }} />
  return <NoCoversationSelected {...props} />
}

function NoCoversationSelected({ openNewChatModal }) {
  return <div className="OrganizationChatPage-NoCoversationSelected">
    <div>
      <Icon type="chat" size="lg" />
      <Header size="lg">Your Messages</Header>
      <Header size="md">Send private photos and messages to a friend or group.</Header>
      <Button type="primary" value="SEND MESSAGE" onClick={openNewChatModal} />
    </div>
  </div>
}

function NewDMChatChannel({ organization, myPublicProfile, memberUserDids }) {
  memberUserDids = memberUserDids.filter(did => did !== myPublicProfile.did)

  const organizationApikey = organization.apikey
  const createChatChannel = useCreateChatChannel('OrganizationChatPage')
  const [error, setError] = useState()

  useEffect(
    () => {
      createChatChannel({
        type: 'dm',
        organizationApikey,
        memberUserDids,
      }).catch(setError)
    },
    []
  )

  return <div className="OrganizationChatPage-NewDMChatChannel">
    {error ? <ErrorMessage {...{ error, dismissable: false }} /> : <Loading type="fullPage" />}
  </div>
}

function ChatChannel({
  organization,
  myPublicProfile,
  chatChannelUid,
  chatChannelSynopsis,
  messageUid,
  chatChannelType,
}) {
  const {
    chatChannel,
    chatMessages,
    chatMessagesLoadingError,
    pendingChatMessages,
    createChatMessage,
    editChatMessage,
    replyToMessage,
    deleteChatMessage,
    loadMessages,
    markChatMessagesAsRead,
    undoDeleteChatMessage,
  } = useChatChannel(chatChannelUid, messageUid, 'OrganizationChatPage')
  const { listmuted, mutedUsers } = useMutedUsers('OrganizationChatPage')
  const [isOtherMemberAdmin, setIsOtherMemberAdmin] = useState(false)


  useEffect(() => {
    listmuted({ organizationDid: organization.did })
  }, [listmuted])

  useEffect(
    () => { if (chatChannelSynopsis) loadMessages() },
    chatChannelSynopsis ? [chatChannelSynopsis.latestAt, chatChannelSynopsis.unread] : []
  )

  if (chatMessagesLoadingError) return <ErrorMessage error={chatMessagesLoadingError} />
  if (!chatChannel) return <Loading type="block" />
  let isUserMutedForDM = false
  let isUserMutedForHubchat = false

  if (mutedUsers && Array.isArray(mutedUsers)) {
    isUserMutedForDM = mutedUsers.some(muted =>
      muted.user_did === myPublicProfile.did &&
      muted.organization_did === organization.did &&
      (muted.mute_type === 'ALL' || muted.mute_type === 'DM')
    )
    isUserMutedForHubchat = mutedUsers.some(muted =>
      muted.user_did === myPublicProfile.did &&
      muted.organization_did === organization.did &&
      (muted.mute_type === 'ALL' || muted.mute_type === 'hubchat')

    )
  }


  const isGeneral = chatChannel.type === 'general'


  const dmMute = chatChannel.type === 'dm' && isUserMutedForDM
  const generalMute = chatChannel.type === 'general' && isUserMutedForHubchat

  return <ChatWindow {...{
    organization,
    myPublicProfile,
    uid: chatChannel.uid,
    loading: false,
    disabled: false,
    chatChannelUid,
    chatChannelType,
    messageUid,
    header: (
      isGeneral ? (
        <Fragment>
          <ChatChannelAvatar size="sm" value="#" />
          <Header size="lg">{`${organization.name} Chat`}</Header>
        </Fragment>
      ) : <DMChatChannelHeader {...{
        organization,
        myPublicProfile,
        memberUserDids: chatChannel.memberUserDids,
        onAdminStatusChange: setIsOtherMemberAdmin
      }} />
    ),
    chatMessages,
    pendingChatMessages,
    markChatMessagesAsRead,
    createChatMessage,
    editChatMessage,
    replyToMessage,
    dmMute,
    generalMute,
    isOtherMemberAdmin,
    deleteChatMessage,
    undoDeleteChatMessage,
    createdAt: isGeneral ? null : chatChannel.createdAt,
    creatorUserDid: isGeneral ? null : chatChannel.creatorUserDid,
  }} />
}

function DMChatChannelHeader({ organization, myPublicProfile, memberUserDids, onAdminStatusChange }) {
  const { acceptedOrganizationMemberships } =
  useAcceptedMembershipsForOrganization(organization.apikey, 'OrganizationChatPage')
  const otherMemberDids = new Set(memberUserDids)
  otherMemberDids.delete(myPublicProfile.did)

  const otherMemberDid = otherMemberDids.values().next().value

  useEffect(() => {
    if (otherMemberDids.size === 1) {
      const otherMemberDid = otherMemberDids.values().next().value
      const isOtherMemberAdmin = acceptedOrganizationMemberships.some(membership =>
        membership.memberUserDid === otherMemberDid && membership.admin)
      onAdminStatusChange(isOtherMemberAdmin)
    } else {

      onAdminStatusChange(false)
    }
  }, [acceptedOrganizationMemberships, otherMemberDid, onAdminStatusChange])


  const { publicProfiles } = usePublicProfiles(
    [...otherMemberDids],
    'OrganizationChatPage'
  )

  return <Fragment>
    <EndUserAvatarStack {...{ size: 'sm', publicProfiles }} />
    <EndUserDisplayNameList {...{
      publicProfiles, asMembersOf: organization.apikey
    }} />
  </Fragment>
}

function ChatWindow({
  organization,
  myPublicProfile,
  uid,
  loading,
  disabled,
  header,
  chatMessages,
  pendingChatMessages,
  markChatMessagesAsRead,
  createChatMessage,
  editChatMessage,
  replyToMessage,
  deleteChatMessage,
  undoDeleteChatMessage,
  createdAt,
  creatorUserDid,
  chatChannelUid,
  messageUid,
  dmMute,
  generalMute,
  isOtherMemberAdmin,
  chatChannelType,
}) {

  const { isAdmin, isCurator } = useMyOrganizationMembership(
    organization.apikey,
    "OrganizationChatPage"
  )
  const chatMessageFormRef = useRef()
  const [isEditing, setIsEditing] = useState(false)
  const [editedMessage, setEditedMessage] = useState('')
  const [editMessageUid, setEditMessageUid] = useState(null)
  const [editedMessageIds, setEditedMessageIds] = useState(
    new Set(JSON.parse(localStorage.getItem('editedMessageIds') || '[]'))
  )


  const [isMessageDeletedByAdmin, setIsMessageDeletedByAdmin] = useState(false)

  const handleEditMessage = useCallback((uid, message, isDeletedByAdmin, editedMessage) => {
    setIsEditing(true)
    setEditedMessage(editedMessage || message)
    setEditMessageUid(uid)
    setIsMessageDeletedByAdmin(isDeletedByAdmin) // Store this state
  }, [])


  const handleSaveMessage = useCallback(() => {
    if (editMessageUid) {
      const updatedMessage = { message: editedMessage, isEdited: true }
      editChatMessage(chatChannelUid, editMessageUid, updatedMessage)
      setIsEditing(false)
      setEditedMessageIds((prevIds) => {
        const newIds = new Set([...prevIds, editMessageUid])
        localStorage.setItem('editedMessageIds', JSON.stringify([...newIds]))
        return newIds
      })
      setEditedMessage('')
      setEditMessageUid(null)

    }
  }, [editChatMessage, chatChannelUid, editMessageUid, editedMessage])


  const handleDeleteMessage = useCallback(async (messageUid, deletionReason = "",  AdminComment = "",) => {
    try {
      await deleteChatMessage(chatChannelUid, messageUid, deletionReason, AdminComment)
    } catch (error) {
      console.error('Error deleting chat message:', error)
      // Handle error case
    }
  }, [deleteChatMessage, chatChannelUid])


  const handleUndoDeleteClick = useCallback(async (chatChannelUid, messageUid, action) => {
    try {
      await undoDeleteChatMessage(chatChannelUid, messageUid, action)
    } catch (error) {
      console.error(`Error processing undelete request with UID: ${messageUid}`, error)
    }
  }, [undoDeleteChatMessage, chatChannelUid])

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
    setEditedMessage('')
    setEditMessageUid(null)
  }, [])

  const [replyingTo, setReplyingTo] = useLocalStorage(
    `chatMessages:${uid}:replyingTo`,
    false
  )

  const focusInput = useCallback(
    () => {
      if (isMobile) return
      const start = Date.now()
      const stop = () => { clearInterval(intervalId) }
      const focus = () => {
        if (Date.now() - start > 1000) return stop()
        if (!chatMessageFormRef.current) return
        const input = chatMessageFormRef.current.base.querySelector('textarea')
        if (!input) return
        const { activeElement } = global.document
        if (activeElement === input) return stop()
        input.focus()
      }
      const intervalId = setInterval(focus, 100)
    },
    []
  )

  const uploadFiles = useCallback(
    files => {
      files.forEach(file => {
        createChatMessage({ file })
      })
      focusInput()
    },
    [createChatMessage],
  )

  useEffect(focusInput, [!!chatMessages])

  if (loading) return <Loading type="block" />

  return <FilesUploadDroparea
    className="OrganizationChatPage-ChatWindow"
    onFiles={uploadFiles}
    disabled={disabled}
  >
    <div className="OrganizationChatPage-header">
      <IconButton
        type="back"
        href={`/${organization.apikey}/chat`}
        className="OrganizationChatPage-backButton"
      />
      {header}
    </div>
    {chatMessages
      ? <Fragment>
        <div className="OrganizationChatPage-ChatWindow-messages">
          <ChatMessages {...{
            chatMessages,
            pendingChatMessages,
            myPublicProfile,
            focusInput,
            markChatMessagesAsRead,
            createdAt,
            creatorUserDid,
            chatChannelUid,
            messageUid,
            editChatMessage,
            replyToMessage,
            handleDeleteMessage,
            handleUndoDeleteClick,
            replyingTo,
            setReplyingTo,
            handleEditMessage,
            editedMessageIds,
            isAdmin,
            isCurator,
            organization,
            chatChannelType,
          }} />
        </div>
        {isEditing ? (
          <ChatMessageForm
            isEditing
            editedMessage={editedMessage}
            handleEditMessage={setEditedMessage}
            handleSaveMessage={handleSaveMessage}
            handleCancelEdit={handleCancelEdit}
            isDeletedByAdmin={isMessageDeletedByAdmin}

          />
        ) : (
          <ChatMessageForm
            {...{
              ref: chatMessageFormRef,
              uid,
              createChatMessage,
              uploadFiles,
              disabled: disabled || !chatMessages,
              replyingTo,
              setReplyingTo,
              replyToMessage,
              chatChannelUid,
              dmMute,
              generalMute,
              isOtherMemberAdmin,
            }}
          />
        )}
      </Fragment>
      : <Loading type="block" delayed />
    }
  </FilesUploadDroparea>
}

function ChatMessages({
  myPublicProfile,
  chatMessages = [],
  pendingChatMessages = [],
  focusInput,
  error,
  markChatMessagesAsRead,
  createdAt,
  creatorUserDid,
  chatChannelUid,
  editChatMessage,
  replyToMessage,
  handleDeleteMessage,
  handleUndoDeleteClick,
  replyingTo,
  setReplyingTo,
  handleEditMessage,
  editedMessageIds,
  isAdmin,
  isCurator,
  organization,
  chatChannelType,
  fromMe,
}) {
  const publicProfileDids = new Set(chatMessages.map(cm => cm.creatorUserDid))
  if (creatorUserDid) publicProfileDids.add(creatorUserDid)
  const { publicProfiles } = usePublicProfiles(publicProfileDids, 'OrganizationChatPage')
  const { uploadingAssets } = useUploadAssets('OrganizationChatPage')


  const creatorPublicProfile = publicProfiles.find(pp => pp.did === creatorUserDid)
  const children = useMemo(
    () => {
      const allChatMessages = [
        ...chatMessages,
        ...pendingChatMessages.map(pcm => ({
          ...pcm,
          creatorUserDid: myPublicProfile.did,
          pending: true,
        })),
      ].map(chatMessage => {
        const fromMe = chatMessage.creatorUserDid === myPublicProfile.did
        const createdAt = moment(chatMessage.createdAt)
        return {
          ...chatMessage,
          fromMe,
          unread: !fromMe && !chatMessage.readAt,
          publicProfile: (
            fromMe ? myPublicProfile :
            publicProfiles.find(p => p.did === chatMessage.creatorUserDid)
          ),
          upload: chatMessage.uploadId && uploadingAssets[chatMessage.uploadId],
          timestamp: createdAt.format(Timestamp.formats.full),
          day: createdAt.format('LL'),
        }
      })
      const children = []

      if (creatorPublicProfile && createdAt) children.push(
        <Header subtle italic centered className="OrganizationChatPage-createdBy">
          <span>created by </span>
          <span>{publicProfileToDisplayName(creatorPublicProfile)} </span>
          <span>on <Timestamp time={createdAt} format="date" /> </span>
          <span>at <Timestamp time={createdAt} format="time" /></span>
        </Header>
      )

      allChatMessages.forEach((chatMessage, index, messages) => {
        const prevMessage = messages[index - 1]
        const nextMessage = messages[index + 1]
        if (prevMessage && prevMessage.day !== chatMessage.day) children.push(
          <DayBreak {...{ key: chatMessage.day, day: chatMessage.day }} />
        )

        const props = {
          ...chatMessage,
          key: chatMessage.uid,
          messageUid: chatMessage.uid,
          chatChannelUid: chatChannelUid,
          editChatMessage: editChatMessage,
          replyToMessage: replyToMessage,
          handleDeleteMessage: handleDeleteMessage,
          handleUndoDeleteClick: handleUndoDeleteClick,
          replyingTo,
          setReplyingTo,
          handleEditMessage,
          editedMessageIds,
          publicProfiles,
          isAdmin,
          isCurator,
          organization,
          chatChannelType,
          readAt: !fromMe && chatMessage.readAt,
        }

        const isOther = m => !m || m.creatorUserDid !== chatMessage.creatorUserDid
        props.firstInGroup = isOther(prevMessage)
        props.lastInGroup = isOther(nextMessage)
        children.push(<ChatMessage {...props} publicProfiles={publicProfiles}
          fromMe={chatMessage.creatorUserDid === myPublicProfile.did}
          publicProfile={publicProfiles.find(p => p.did === chatMessage.creatorUserDid)}
          myPublicProfile={myPublicProfile}

        />)
      })

      return children
    },
    [chatMessages, pendingChatMessages, uploadingAssets]
  )


  const pageHasFocus = usePageHasFocus()
  const listRef = useRef()
  const forceUpdate = useForceUpdate()
  const isStuckToBottomRef = useRef(true)

  const onScroll = useCallback(
    () => {
      const isStuckToBottom = isScrolledToBottom(listRef.current)
      if (isStuckToBottomRef.current === isStuckToBottom) return
      isStuckToBottomRef.current = isStuckToBottom
      forceUpdate()
    },
    []
  )

  const scrollToBottom = useCallback(
    smooth => {
      const list = listRef.current
      if (!list) return
      const top = list.scrollHeight - list.offsetHeight
      if (smooth) {
        list.scrollTo({ top, behavior: 'smooth' })
      } else {
        list.scrollTop = top
      }
      isStuckToBottomRef.current = true
    },
    []
  )

  // start scrolled at the bottom
  useEffect(
    () => {
      const list = listRef.current
      if (!list) return
      const hasMedia = list.querySelectorAll('.OrganizationChatPage-FileAttachment').length > 0
      const scrollToBottomAndMakeVisible = () => {
        scrollToBottom()
        list.style.visibility = 'visible'
      }
      scrollToBottomAndMakeVisible()
      if (hasMedia) callAFewMoreTimes(scrollToBottomAndMakeVisible)
    },
    []
  )

  useOnResize(
    listRef,
    () => { if (isStuckToBottomRef.current) scrollToBottom() },
    []
  )

  useOnDOMChange({
    ref: listRef,
    onDOMChange() {
      if (isStuckToBottomRef.current) scrollToBottom()
    },
  })

  useEffect(
    () => {
      const list = listRef.current
      if (!list) return
      const latestMessage = chatMessages[chatMessages.length - 1]
      const latestMessageIsFromMe = latestMessage && latestMessage.pending
      if (!latestMessageIsFromMe) return
      focusInput()
      scrollToBottom(isStuckToBottomRef.current)
      callAFewMoreTimes(scrollToBottom)
    },
    [chatMessages.length]
  )

  useEffect(
    () => {
      if (pageHasFocus && isStuckToBottomRef.current && chatMessages.length > 0)
        markChatMessagesAsRead()
    },
    [pageHasFocus, chatMessages.length]
  )

  const onDownButtonClick = useCallback(
    () => {
      scrollToBottom(true)
      focusInput()
    },
    [scrollToBottom, focusInput]
  )

  return <div className="OrganizationChatPage-ChatMessages">
    <IconButton
      key="scrollDownButton"
      className="OrganizationChatPage-scrollDownButton"
      onClick={onDownButtonClick}
      type="angle-circled-down"
      size="lg"
      data-hidden={isStuckToBottomRef.current}
    />
    <div
      ref={listRef}
      className="OrganizationChatPage-ChatMessages-list"
      onScroll={onScroll}
      style={{ maxHeight: '80vh', overflowY: 'scroll', visibility: 'hidden' }}

    >
      <TransitionGroup>
        {children.map((child, index) =>
          <CSSTransition
            key={index}
            timeout={200}
            classNames="OrganizationChatPage-ChatMessages-transition"
          >{child}</CSSTransition>
        )}
        {error && <ErrorMessage error={error} />}
      </TransitionGroup>
    </div>
  </div>
}

const FILE_ATTACHMENT_PREFIX = 'jlinc:dm:attachment:'

const DayBreak = memo(({ day }) =>
  <Header size="sm" className="OrganizationChatPage-DayBreak">{day}</Header>
)

function ChatMessage({
  uid,
  pending,
  error,
  message,
  timestamp,
  fromMe,
  unread,
  upload,
  publicProfile,
  lastInGroup,
  firstInGroup,
  createdAt,
  handleEditMessage,
  urlPreview,
  setReplyingTo,
  repliedMessage,
  editedMessageIds,
  handleDeleteMessage,
  handleUndoDeleteClick,
  deletedAt,
  deletedByUserDid,
  isAdmin,
  isCurator,
  chatChannelType,
  deletedByRole,
  readAt,
  chatChannelUid,
  editedMessage,
  undeletedAt,
  undeleteDeniedAt,
  repliedMessageCreatorDid,
  publicProfiles = [],
  myPublicProfile,
  recipientUserDid,
}) {
  const isDeletedByAdmin = deletedAt && (deletedByRole === 'admin' || deletedByRole === 'curator')
  const isUndeleted = !!undeletedAt
  const isUndeleteDenied = !!undeleteDeniedAt

  const now = new Date()
  const readTimestamp = new Date(readAt)
  const timeElapsed = now - readTimestamp

  function isMessageReadByRecipient(readAt) {
    return !!readAt
  }
  const isReadByRecipient = isMessageReadByRecipient(recipientUserDid, readAt)

  const [showDeletionModal, setShowDeletionModal] = useState(false)
  const [selectedReason, setSelectedReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [adminComment, setAdminComment] = useState("")
  const isGeneralChat = chatChannelType === 'general'

  const canDelete = (isAdmin || isCurator) && !fromMe && isGeneralChat

  const isDeleted = !!deletedAt
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const className = classNames(
    'OrganizationChatPage-ChatMessage',
    { fromMe, pending, failed: !!error, unread }
  )


  const handleDeleteClick = () => {

    if (canDelete) {
      setShowDeletionModal(true)
    } else {
      handleDeleteMessage(uid)
    }
  }
  const fileAttachment = (
    message &&
    message.startsWith(FILE_ATTACHMENT_PREFIX) &&
    JSON.parse(message.split(FILE_ATTACHMENT_PREFIX)[1])
  )


  const handleEditClick = () => {
    handleEditMessage(uid, message, isDeletedByAdmin, editedMessage)
  }


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleReplyClick = () => {
    setReplyingTo({
      message: message,
      uid: uid,
      username: fromMe ? 'You' : publicProfile.username,
    })
    setShowDropdown(false)
  }

  // from endpoint edit message if it is less than 60 minutes old


  const dropdownClassName = classNames(
    'OrganizationChatPage-Bubble-dropdown',
    { 'from-me': fromMe, 'from-others': !fromMe }
  )

  const handleConfirmDelete = () => {
    if (
      !selectedReason ||
      (selectedReason === "Other (please specify)" && !customReason.trim())
    ) {
      // eslint-disable-next-line no-alert
      alert("Please select a reason for deletion.")
      return
    }

    const deletionReason =
      selectedReason === "Other (please specify)"
        ? customReason
        : selectedReason
    console.log("Delete reason:", deletionReason)

    setShowDeletionModal(false)

    handleDeleteMessage(uid, {
      deletionReason:
        selectedReason === "Other (please specify)"
          ? customReason
          : selectedReason,
      AdminComment : adminComment
    })
    setAdminComment("")
  }
  const messageContent = editedMessage || message
  const messageIsWYSIWYG = /^<(h\d|p|ul|figure)/.test(message)
  return (
    <div {...{ className }} id={`message-${uid}`}>
      <div
        className={dropdownClassName}
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-menu-vertical-dots"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>

        {showDropdown && (
          <ul className="dropdown-menu">
            {!isDeleted && !(isUndeleted || isUndeleteDenied) && fromMe && (

              <li>
                <span className="dropdown-option" onClick={handleEditClick}>Edit</span>
              </li>
            )}

            {isDeletedByAdmin && !(isUndeleted || isUndeleteDenied) && fromMe && (
              <li>
                <span className="dropdown-option" onClick={handleEditClick}>Request Edit</span>
              </li>
            )}

            {!isDeleted && (
              <li>
                <span className="dropdown-option" onClick={handleReplyClick}>Reply</span>
              </li>
            )}

            {!isDeleted && canDelete && (
              <li>
                <span className="dropdown-option" onClick={handleDeleteClick}>
                  Delete
                </span>
              </li>
            )}
            {!isDeleted && fromMe && (!readAt || timeElapsed < 3600000) && (
              <li>
                <span
                  className="dropdown-option"
                  onClick={() => handleDeleteMessage(uid)}
                >
                  Delete
                </span>
              </li>
            )}
            {isDeleted && canDelete && (
              <li>
                <span className="dropdown-option" onClick={() => handleUndoDeleteClick(chatChannelUid, uid, 'approve')}>
                Accept
                </span>
              </li>
            )}
            {isDeleted && canDelete && (
              <li>
                <span
                  className="dropdown-option" onClick={() => handleUndoDeleteClick(chatChannelUid, uid, 'deny')}
                >
                  Deny
                </span>
              </li>
            )}
          </ul>
        )}
        {showDeletionModal && (
          <ChatMessageDeletionModal
            handleConfirmDelete={handleConfirmDelete}
            onCancel={() => setShowDeletionModal(false)}
            selectedReason={selectedReason}
            customReason={customReason}
            setSelectedReason={setSelectedReason}
            setCustomReason={setCustomReason}
            showDeletionModal={showDeletionModal}
            setShowDeletionModal={setShowDeletionModal}
            isAdmin={isAdmin}
            isCurator={isCurator}
            adminComment={adminComment}
            setAdminComment={setAdminComment}
          />
        )}
      </div>
      {fromMe ? (
        <div className="OrganizationChatPage-ChatMessage-status">
          {pending ? (
            error ? (
              <ChatMessageFailed {...{ error, message, upload }} />
            ) : (
              <Spinner />
            )
          ) : (
            isReadByRecipient ? (
              <>
                <Icon size="sm" type="checkmark" />
                <Icon size="sm" type="checkmark" />
              </>
            ) : (
              <Icon size="sm" type="checkmark" />
            ))}
        </div>
      ) : (
        <Link
          href={
            publicProfile && publicProfileToPathname(publicProfile)
          }
        >
          <EndUserAvatar
            {...{
              publicProfile,
              size: "sm",
              style: { visibility: lastInGroup ? null : "hidden" },
            }}
          />
        </Link>
      )}
      {upload ? (
        <UploadingFile {...upload} />
      ) : fileAttachment ? (
        <FileAttachment {...fileAttachment} />
      ) : (
        <div className="OrganizationChatPage-Bubble" title={timestamp}>
          {!fromMe && firstInGroup && publicProfile && (
            <LinkToPublicProfile
              {...{
                type: "text",
                className: "OrganizationChatPage-ChatMessage-displayName",
                publicProfile,
              }}
            />
          )}
          {urlPreview &&
           (
             <div className="RichMediaInput-urlPreview " >
               <ChatUrlPreview {...urlPreview} />
             </div>
           )}
          {repliedMessage && (
            <div className="repliedMessageWrapper">
              <span
                className={fromMe ? "fromMe-indicator" : "fromOthers-indicator"}
              />
              <div className="repliedMessageContent">
                <span className="username">
                  {repliedMessageCreatorDid &&
                  (publicProfiles.find(p => p.did === repliedMessageCreatorDid).username
                  === myPublicProfile.username) ? 'You'
                  : publicProfiles.find(p => p.did
                  === repliedMessageCreatorDid)?.username}
                </span>
                <br />
                <span className="repliedText">{repliedMessage}</span>
              </div>
            </div>
          )}
          {
            isDeleted ? (
              <div className="deleted-message-placeholder" style={{
                fontStyle: 'italic',
                fontSize: '14px'
              }}>
                    Message was deleted by
                {deletedByRole === "admin" || deletedByRole === "curator"
                  ? ` the ${deletedByRole}`
                  : fromMe
                    ? " you"
                    : ` ${publicProfiles.find((p) => p.did === deletedByUserDid)?.username || " unknown"}`}
              </div>
            ) : messageIsWYSIWYG ? (
              <WYSIWYGContent source={messageContent} />
            ) : (
              <PlainText text={messageContent} />
            )
          }

          <Subtext className="OrganizationChatPage-Bubble-time">
            <Timestamp time={createdAt} format="time" />
          </Subtext>

          {editedMessageIds.has(uid) && (
            <span className="edited-label">edited</span>
          )}
        </div>
      )}
    </div>
  )
}

function ChatMessageFailed({ error, message, upload }) {
  return <IconButton
    className="OrganizationChatPage-ChatMessageFailed"
    onClick={() => {
      console.error(error)
      console.log({ message, upload })
    }}
  >!</IconButton>
}

function UploadingFile({ loading, progress, error, preview }) {
  const failed = !!error
  const className = classNames('OrganizationChatPage-UploadingFile', {
    failed,
  })
  return <div {...{ className }}>
    <FileAttachment {...preview} />
    {loading &&
      <div
        className="OrganizationChatPage-UploadingFile-progress"
        style={{ right: `${100 - (progress || 95)}%` }}
      />
    }
  </div>
}

function FileAttachment({ type, url, name, size, height, width }) {
  const isMedia = type && type.match(/(image|video|audio)/i)
  const className = classNames('OrganizationChatPage-FileAttachment', {
    media: isMedia,
    file: !isMedia,
  })
  return <Link {...{ href: url, className }} newWindow>
    {isMedia
      ? <MediaAttachment {...{
        type: isMedia[0].toLowerCase(),
        url, height, width
      }} />
      : <Fragment>
        <Icon size="lg" type="brandposts" />
        <div className="OrganizationChatPage-fileInfo">
          <Header size="lg">{name}</Header>
          <Header size="md"><FileSize {...{ size }} /></Header>
        </div>
      </Fragment>
    }
  </Link>
  return
}

function MediaAttachment({ type, url, height, width }) {
  const props = { src: url }
  return <Letterbox {...{ height, width }}>
    {
      type === 'image' ? <img {...props} /> :
      type === 'video' ? <video controls muted loading="lazy" {...props} /> :
      type === 'audio' ? <audio controls muted loading="lazy" {...props} /> :
      null
    }
  </Letterbox>
}


function ChatMessageForm({
  uid,
  createChatMessage,
  uploadFiles,
  disabled,
  isEditing = false,
  editedMessage,
  handleEditMessage,
  handleSaveMessage,
  // setEditState = () => { },
  setReplyingTo,
  replyingTo,
  replyToMessage,
  chatChannelUid,
  handleCancelEdit,
  dmMute,
  generalMute,
  isOtherMemberAdmin,
  isDeletedByAdmin,
}) {
  const [showPicker, setShowPicker] = useState(false)

  const textAreaRef = useRef()
  const online = useOnlineStatus()
  if (!online || (generalMute && !isOtherMemberAdmin) || (dmMute && !isOtherMemberAdmin)) disabled = true
  const messageUid = replyingTo?.uid

  const [draft, setDraft] = useLocalStorage(
    `chatMessages:${uid}:draft`,
    '',
  )

  const [inputStr, setInputStr] = useState(draft)
  const submittable = !disabled && inputStr?.length > 0
  const { loadUrlPreview, urlPreviews } = useUrlPreviews('ChatMessageForm')
  const [currentURLPreview, setCurrentURLPreview] = useState(undefined)

  useEffect(() => {
    const urls = findUrls(inputStr)
    if (urls.length === 0) {
      setCurrentURLPreview(undefined)
      return
    }

    const [url] = urls
    if (url in urlPreviews) {
      setCurrentURLPreview(urlPreviews[url])
    } else {
      loadUrlPreview(url)
    }
  }, [inputStr, urlPreviews])


  useEffect(() => {
    setDraft(inputStr)
  }, [inputStr, setDraft])

  const onSubmit = async () => {
    if (!submittable) return
    if (inputStr.length === 0) {
      return
    }
    if (isEditing) {
      handleSaveMessage()
    } else if (replyingTo) {
      replyToMessage(chatChannelUid, messageUid, {
        originalMessage: replyingTo.message,
        replyMessage: inputStr,
      })
      setReplyingTo(null)
    } else {
      const messageData = {
        message: inputStr
      }
      if (currentURLPreview) {
        messageData.urlPreview = currentURLPreview
      }
      createChatMessage(messageData)
    }
    setInputStr('')
    setCurrentURLPreview(undefined)
  }


  const placeholderText = !online
    ? 'OFFLINE'
    : generalMute
      ? 'You are paused from General Chat' : dmMute ? "you are paused from Private chat"
      : disabled
        ? ''
        : 'Message…'


  const handlePaste = (event) => {
    const paste = (event.clipboardData || window.clipboardData).getData('text')
    const urls = findUrls(paste)
    if (urls.length > 0) {
      const [url] = urls
      loadUrlPreview(url)
    }
  }

  useEffect(() => {
    if (isEditing) {
      setInputStr(editedMessage)
    }
  }, [isEditing, editedMessage])

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (!isEditing) {
      setInputStr('')
    }
  }, [isEditing])


  const submitOnEnter = (event) => {
    if (!disabled && !isMobile && !event.metaKey && !event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      onSubmit()
    }
  }

  const onEmojiClick = (emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji)
    setShowPicker(false)
  }

  const handleClearReply = () => {
    setReplyingTo(null)
  }

  return (
    <div>
      <div className="OrganizationChatPage-EmojiPicker">
        {showPicker && (
          <Picker
            pickerStyle={{ width: '100%' }}
            onEmojiClick={onEmojiClick}
            emojiStyle="native"
          />
        )}
      </div>

      {isEditing && (
        <div className="replyingWrapper">
          <div onClick={handleCancelEdit} className="clearReplyButton">
            <RemoveButton />
          </div>
          <div className="replyingContent">
            <span className="username">Editing</span>:<br />
            <span className="messageText">{editedMessage.length > 50 ?
              `${editedMessage.substring(0, 50)}...` : editedMessage}</span>
          </div>
        </div>
      )}
      {replyingTo && (
        <div className="replyingWrapper">
          <div onClick={handleClearReply} className="clearReplyButton">
            <RemoveButton />
          </div>
          <div className="replyingContent">
            <span className="username">{replyingTo.username}</span>:<br />
            <span className="messageText">{replyingTo.message}</span>
            {currentURLPreview &&
              <div className="RichMediaInput-urlPreview main_preview" >
                <RemoveButton onClick={() => setCurrentURLPreview(undefined)} />
                <ChatUrlPreview {...currentURLPreview} />
              </div>
            }
          </div>
        </div>
      )}

      <Form
        className="OrganizationChatPage-ChatMessageForm"
        onSubmit={onSubmit}
        disabled={disabled}
      >
        <div className="textStyle">
          <TextArea
            className="TextArea"
            disabled={disabled}
            ref={textAreaRef}
            autoResizeVertically
            minRows={1}
            maxRows={4}
            resize="none"
            placeholder={placeholderText}
            value={isEditing ? editedMessage : inputStr}
            onInput={isEditing ? handleEditMessage : setInputStr}
            onKeyDown={submitOnEnter}
            tabIndex={1}
            onPaste={handlePaste}
          // onPaste={onPaste}
          />

        </div>
        <img
          className="EmojiIcon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker((val) => !val)}
        />
        {disabled || submittable ? (
          <Button
            disabled={disabled}
            submit
            type="primary"
            value={isEditing ? (isDeletedByAdmin ? 'Request Undo Delete' : 'Edit') : 'Send'}
          />
        ) : (
          <FileButton
            className="FileButton"
            disabled={disabled}
            type="subtle"
            onFiles={uploadFiles}
            tabIndex={2}
          >
            <Icon type="upload" />
          </FileButton>
        )}
      </Form>
    </div>
  )

}
const isScrolledToBottom = node => {
  if (!node) return false
  const { scrollHeight, scrollTop, offsetHeight } = node
  const distanceFromBottom = (scrollHeight - offsetHeight) - scrollTop
  return distanceFromBottom < 5
}

// this delay is to allow images to load and resize
function callAFewMoreTimes(func) {
  setTimeout(func, 100)
  setTimeout(func, 150)
  setTimeout(func, 200)
}

function findDMChatChannel(synopsis, did) {
  return synopsis.find(s =>
    s.type === 'dm' &&
    s.memberUserDids.length === 2 &&
    (
      s.memberUserDids[0] === did ||
      s.memberUserDids[1] === did
    )
  )
}
