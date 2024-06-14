import React, { useState } from 'react';
import { Table, Avatar, Modal } from 'antd';
import logo from '@/public/images/logo.png';


const initialPlayers = [
    { key: 1, name: 'Lionel Messi', position: 'RW', team: 'PSG', opp: 'MCI', salary: 12000, fppg: 35.6, SD: 8.2, nextGame: 'PSG vs MCI on May 20, 2024', image: 'https://via.placeholder.com/150' },
    { key: 2, name: 'Cristiano Ronaldo', position: 'CF', team: 'MUN', opp: 'CHE', salary: 11000, fppg: 33.4, SD: 7.9, nextGame: 'MUN vs CHE on May 21, 2024', image: 'https://via.placeholder.com/150' },
    { key: 3, name: 'Neymar Jr', position: 'LW', team: 'PSG', opp: 'MCI', salary: 10500, fppg: 30.1, SD: 7.0, nextGame: 'PSG vs MCI on May 20, 2024', image: 'https://via.placeholder.com/150' },
    { key: 4, name: 'Kylian Mbappe', position: 'CF', team: 'PSG', opp: 'MCI', salary: 10800, fppg: 32.2, SD: 7.5, nextGame: 'PSG vs MCI on May 20, 2024', image: 'https://via.placeholder.com/150' },
    { key: 5, name: 'Kevin De Bruyne', position: 'CAM', team: 'MCI', opp: 'PSG', salary: 10000, fppg: 28.3, SD: 6.8, nextGame: 'MCI vs PSG on May 20, 2024', image: 'https://via.placeholder.com/150' },
    { key: 6, name: 'Robert Lewandowski', position: 'CF', team: 'BAR', opp: 'RMA', salary: 11500, fppg: 34.7, SD: 8.0, nextGame: 'BAR vs RMA on May 22, 2024', image: 'https://via.placeholder.com/150' },
    { key: 7, name: 'Luka Modric', position: 'CM', team: 'RMA', opp: 'BAR', salary: 9200, fppg: 26.5, SD: 6.2, nextGame: 'RMA vs BAR on May 22, 2024', image: 'https://via.placeholder.com/150' },
    { key: 8, name: 'Karim Benzema', position: 'CF', team: 'RMA', opp: 'BAR', salary: 11000, fppg: 33.1, SD: 7.6, nextGame: 'RMA vs BAR on May 22, 2024', image: 'https://via.placeholder.com/150' },
    { key: 9, name: 'Erling Haaland', position: 'CF', team: 'MCI', opp: 'PSG', salary: 11800, fppg: 34.2, SD: 7.8, nextGame: 'MCI vs PSG on May 20, 2024', image: 'https://via.placeholder.com/150' },
    { key: 10, name: 'Sergio Ramos', position: 'CB', team: 'PSG', opp: 'MCI', salary: 8500, fppg: 20.3, SD: 5.5, nextGame: 'PSG vs MCI on May 20, 2024', image: 'https://via.placeholder.com/150' },
    { key: 11, name: 'Virgil van Dijk', position: 'CB', team: 'LIV', opp: 'MCI', salary: 8800, fppg: 21.1, SD: 5.7, nextGame: 'LIV vs MCI on May 21, 2024', image: 'https://via.placeholder.com/150' },
    { key: 12, name: 'Mohamed Salah', position: 'RW', team: 'LIV', opp: 'MCI', salary: 11200, fppg: 31.8, SD: 7.3, nextGame: 'LIV vs MCI on May 21, 2024', image: 'https://via.placeholder.com/150' },
    { key: 13, name: 'Sadio Mane', position: 'LW', team: 'BAY', opp: 'DOR', salary: 10900, fppg: 30.5, SD: 7.4, nextGame: 'BAY vs DOR on May 22, 2024', image: 'https://via.placeholder.com/150' },
    { key: 14, name: 'Joshua Kimmich', position: 'CDM', team: 'BAY', opp: 'DOR', salary: 9400, fppg: 27.4, SD: 6.5, nextGame: 'BAY vs DOR on May 22, 2024', image: 'https://via.placeholder.com/150' },
    { key: 15, name: 'Toni Kroos', position: 'CM', team: 'RMA', opp: 'BAR', salary: 9000, fppg: 25.6, SD: 6.0, nextGame: 'RMA vs BAR on May 22, 2024', image: 'https://via.placeholder.com/150' },
    { key: 16, name: 'Alphonso Davies', position: 'LB', team: 'BAY', opp: 'DOR', salary: 8600, fppg: 22.2, SD: 5.8, nextGame: 'BAY vs DOR on May 22, 2024', image: 'https://via.placeholder.com/150' },
    { key: 17, name: 'Trent Alexander-Arnold', position: 'RB', team: 'LIV', opp: 'MCI', salary: 8700, fppg: 22.7, SD: 5.9, nextGame: 'LIV vs MCI on May 21, 2024', image: 'https://via.placeholder.com/150' },
    { key: 18, name: 'Raheem Sterling', position: 'LW', team: 'CHE', opp: 'MUN', salary: 10000, fppg: 29.0, SD: 6.9, nextGame: 'CHE vs MUN on May 23, 2024', image: 'https://via.placeholder.com/150' },
    { key: 19, name: 'Jadon Sancho', position: 'RW', team: 'MUN', opp: 'CHE', salary: 9500, fppg: 27.0, SD: 6.7, nextGame: 'MUN vs CHE on May 23, 2024', image: 'https://via.placeholder.com/150' },
    { key: 20, name: 'Phil Foden', position: 'CAM', team: 'MCI', opp: 'PSG', salary: 9300, fppg: 26.8, SD: 6.6, nextGame: 'MCI vs PSG on May 20, 2024', image: 'https://via.placeholder.com/150' },
];

function ContestTables() {
    const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [activeButton, setActiveButton] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalPlayer, setModalPlayer] = useState(null);

    // Function to handle button clicks and filter players
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        filterPlayers(buttonName, searchText);
    };

    // Function to handle search input
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        filterPlayers(activeButton, value);
    };

    // Function to filter players based on position and search text
    const filterPlayers = (position, text) => {
        let filteredPlayers = initialPlayers;
        if (position !== "All") {
            filteredPlayers = filteredPlayers.filter(player => player.position === position);
        }
        if (text) {
            filteredPlayers = filteredPlayers.filter(player => player.name.toLowerCase().includes(text.toLowerCase()));
        }
        setAvailablePlayers(filteredPlayers);
    };

    const addPlayer = (player) => {
        setSelectedPlayers([...selectedPlayers, player]);
        setAvailablePlayers(availablePlayers.filter(p => p.key !== player.key));
    };

    const removePlayer = (player) => {
        setAvailablePlayers([...availablePlayers, player]);
        setSelectedPlayers(selectedPlayers.filter(p => p.key !== player.key));
    };

    const showModal = (player) => {
        setModalPlayer(player);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <a onClick={() => showModal(record)} style={{ cursor: 'pointer' }}>
                    {text}
                </a>
            ),
        },
        { title: 'POSITION', dataIndex: 'position', key: 'position' },
        { title: 'TEAM', dataIndex: 'team', key: 'team' },
        { title: 'OPP', dataIndex: 'opp', key: 'opp' },
        { title: 'SALARY', dataIndex: 'salary', key: 'salary' },
        { title: 'FPPG', dataIndex: 'fppg', key: 'fppg' },
        { title: 'SD', dataIndex: 'SD', key: 'SD' },
        {
            render: (text, record) => (
                <button className='rounded-[20px] border-[1px] text-[#012C51] p-[0.5rem] border-[#012C51]' onClick={() => addPlayer(record)}>
                    Add
                </button>
            ),
        },
    ];

    const selectedColumns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <span>
                    <Avatar style={{ marginRight: 8 }}>P</Avatar>
                    {text}
                </span>
            ),
        },
        { title: 'POSITION', dataIndex: 'position', key: 'position' },
        { title: 'FPPG', dataIndex: 'fppg', key: 'fppg' },
        {
            render: (text, record) => (
                <button className='rounded-[20px] border-[1px] text-[red] p-[0.5rem] border-[red]' onClick={() => removePlayer(record)}>
                    Remove
                </button>
            ),
        },
    ];

    return (
        <div className='flex flex-col lg:flex-row gap-8'>
            <div className="flex-[1.5] ">
                <div className="flex mb-[1.5rem]">
                    <button
                        className={`px-[0.7rem] text-sm py-[0.5rem]  rounded-[20px] m-1 ${activeButton === "All" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("All")}
                    >
                        All
                    </button>
                    <button
                        className={`px-[0.8rem] text-sm rounded-[20px] m-1 ${activeButton === "CF" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("CF")}
                    >
                        CF
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm rounded-[20px] m-1 ${activeButton === "LW" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("LW")}
                    >
                        LW
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm rounded-[20px] m-1 ${activeButton === "RW" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("RW")}
                    >
                        RW
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm  rounded-[20px] m-1 ${activeButton === "CAM" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("CAM")}
                    >
                        CAM
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm rounded-[20px] m-1 ${activeButton === "CM" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("CM")}
                    >
                        CM
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm  rounded-[20px] m-1 ${activeButton === "CDM" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("CDM")}
                    >
                        CDM
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm rounded-[20px] m-1 ${activeButton === "CB" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("CB")}
                    >
                        CB
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm rounded-[20px] m-1 ${activeButton === "LB" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("LB")}
                    >
                        LB
                    </button>
                    <button
                        className={`px-[0.7rem] text-sm rounded-[20px] m-1 ${activeButton === "RB" ? "bg-gray-500 text-white" : "border-[2px]"}`}
                        onClick={() => handleButtonClick("RB")}
                    >
                        RB
                    </button>

                    <label className="input input-bordered flex items-center gap-2 mx-[1rem] bg-white rounded-full">
                        <input type="text" className="grow" onChange={handleSearch} placeholder="Search players" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
                <Table columns={columns} dataSource={availablePlayers} className="blue-header no-border" rowKey="key" />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-8 px-5 mb-[1.3rem] text-black">
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <span className="text-[#808080] text-[0.7rem]">Total Salary</span>{" "}
                        <span className="font-semibold text-md">$1000 USD</span>
                    </div>
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <span className="text-[#808080] text-[0.7rem]">Remaining</span>{" "}
                        <span className="font-semibold text-md">$1000 USD</span>
                    </div>
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <span className="text-[#808080] text-[0.7rem]">FPPG</span>{" "}
                        <span className="font-semibold text-md">0.00</span>
                    </div>
                </div>
                <Table columns={selectedColumns} dataSource={selectedPlayers} className="blue-header no-border" rowKey="key" />
            </div>
            {modalPlayer && (
                <Modal
                    title="Player Information"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    style={{ top: 20 }}
                    bodyStyle={{ height: 400, overflowY: 'auto' }}
                >
                    <div className='flex justify-between gap-4'>
                        <aside className='basis-[49%]'>
                            <img src={modalPlayer.image} alt={modalPlayer.name}
                                style={{ width: '100%', marginTop: '10px' }} />
                        </aside>
                        <aside className='basis-[49%]'>
                            <p className='text-2xl font-bold'> {modalPlayer.name}</p>

                            <p className='border inline-block rounded-full my-[1rem] border-[black] px-[0.3rem] text-xl'> ${modalPlayer.salary}</p>
                            <hr />
                            <p>{modalPlayer.nextGame}</p>
                            <div className='flex justify-between my-[1rem]'>
                                <p>
                                    Standard Deviation <br />
                                    <span className='font-bold text-xl'> $1000 USD</span>
                                </p>
                                <p>
                                    FPPG <br />
                                    <span className='font-bold text-xl'> 0.00</span>
                                </p>
                            </div>
                            <div className='flex text-xl text-gray-500 mb-[1rem]'>
                                <p>HOU : 43.5</p>

                                <p>BUF : -3.5</p>
                            </div>
                            <button className='bg-[#012C51] text-white rounded-full w-full p-[0.5rem]'>
                                Draft Player
                            </button>
                        </aside>
                    </div>

                    <div className='flex'>
                        <aside className='basis-[49%]'>
                        <p>{modalPlayer.nextGame}</p>
                            <img src={logo.src} className='w-24' alt="" />
                        </aside>
                        <aside className='basis-[49%]'>
                            <div className='bg-[#F9F9F9] rounded-md mb-[1rem] mt-[1rem]'>
                                <h2 className='text-black text-lg'>Ball-Draft Platform</h2>
                                <p className='flex gap-4 my-[0.5rem] text-sm text-gray-500'><span>2 days ago</span> <li className='list-disc'>Highlight</li></p>
                                <p className='text-[12px]'>Gabe Davis reeled in five of his nine targets for 26 yards and a touchdown during the 2023 regular session.
                                    Advice: Bell provided a serviceable backup veteran tight end for the Chiefs in 2023. But, he sat clearly behind Travis Kelce and Noag Gabe in the pecking order. Bulldozer’s contract expires following the season.</p>
                            </div>
                            <div className='bg-[#F9F9F9] rounded-md'>
                                <h2 className='text-black text-lg'>Ball-Draft Platform</h2>
                                <p className='flex gap-4 my-[0.5rem] text-sm text-gray-500'><span>2 days ago</span> <li className='list-disc'>Highlight</li></p>
                                <p className='text-[12px]'>Gabe Davis reeled in five of his nine targets for 26 yards and a touchdown during the 2023 regular session.
                                    Advice: Bell provided a serviceable backup veteran tight end for the Chiefs in 2023. But, he sat clearly behind Travis Kelce and Noag Gabe in the pecking order. Bulldozer’s contract expires following the season.</p>
                            </div>
                        </aside>
                    </div>
                    {/* 
                    <p><strong>Position:</strong> {modalPlayer.position}</p>
                    <p><strong>Team:</strong> {modalPlayer.team}</p>
                    <p><strong>Opponent:</strong> {modalPlayer.opp}</p>

                    <p><strong>FPPG:</strong> {modalPlayer.fppg}</p>
                    <p><strong>Standard Deviation:</strong> {modalPlayer.SD}</p> */}


                </Modal>
            )}
        </div>
    );
}

export default ContestTables;
