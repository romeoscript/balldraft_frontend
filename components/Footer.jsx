"use client"

import React from 'react'
import logo from '@/public/images/logo.png';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import footerLogo from '@/public/images/footer-logo.png';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const router = usePathname();
    const isAuthRoute = router.includes('/Auth');
    return (
        <>
            {!isAuthRoute &&

                <footer className='bg-[#012C51]'>
                    <div className='md:hidden p-[2rem] mb-0'>
                        <img src={logo.src} className='w-[100px]' alt="" />
                        <p><EmailIcon />accounts@balldraft.com</p>
                        <p><LocationOnIcon />123 Ape Town, NY 11943, New York</p>
                    </div>
                    <div className='footer flex max-md:flex-col-reverse max-md:flex-wrap gap-4 justify-between items-start  p-[1.5rem]'>
                        <div className='footer-left md:w-2/5'>
                            <div className='max-md:hidden'>
                                <img src={logo.src} alt="" />
                                <p><EmailIcon />accounts@balldraft.com</p>
                                <p><LocationOnIcon />123 Ape Town, NY 11943, New York</p>
                            </div>
                            <aside className='my-[1rem]'>
                                <h2 className='footer-title'>News Letter</h2>
                                <p>Stay informed about the latest promotions, exclusive bonuses and exciting events by subscribing tou our newsletter - your gateway to the best in the world of online gaming</p>
                            </aside>
                            <div className='bg-white relative w-full p-[0.4rem] my-[1rem] rounded-[10px] flex justify-end items-center'>
                                <input type="text" placeholder='Enter your email' className='w-3/4 p-2 rounded-lg w-full bg-white outline-none' />
                                <button className='bg-[#012C51] text-white rounded-[30px] p-3  absolute'>Subscribe</button>
                            </div>
                        </div>
                        <footer className="footer md:grid-rows-2 grid-cols-2 md:p-10  text-neutral-content">
                            <nav>
                                <h6 className="footer-title">Services</h6>
                                <a className="link link-hover">Branding</a>
                                <a className="link link-hover">Design</a>
                                <a className="link link-hover">Marketing</a>
                                <a className="link link-hover">Advertisement</a>
                            </nav>
                            <nav>
                                <h6 className="footer-title">Company</h6>
                                <a className="link link-hover">About us</a>
                                <a className="link link-hover">Contact</a>
                                <a className="link link-hover">Jobs</a>
                                <a className="link link-hover">Press kit</a>
                            </nav>
                            <nav>
                                <h6 className="footer-title">Legal</h6>
                                <a className="link link-hover">Terms of use</a>
                                <a className="link link-hover">Privacy policy</a>
                                <a className="link link-hover">Cookie policy</a>
                            </nav>
                            <nav>
                                <h6 className="footer-title">Social</h6>
                                <a className="link link-hover">Twitter</a>
                                <a className="link link-hover">Instagram</a>
                                <a className="link link-hover">Facebook</a>
                                <a className="link link-hover">Github</a>
                            </nav>
                            <nav>
                                <h6 className="footer-title">Explore</h6>
                                <a className="link link-hover">Features</a>
                                <a className="link link-hover">Enterprise</a>
                                <a className="link link-hover">Security</a>
                                <a className="link link-hover">Pricing</a>
                            </nav>
                            <nav>
                                <h6 className="footer-title">Apps</h6>
                                <a className="link link-hover">Mac</a>
                                <a className="link link-hover">Windows</a>
                                <a className="link link-hover">iPhone</a>
                                <a className="link link-hover">Android</a>
                            </nav>
                        </footer>
                    </div>

                    <img src={footerLogo.src} className='w-full' alt="" />
                </footer>}
        </>
    )
}

export default Footer
