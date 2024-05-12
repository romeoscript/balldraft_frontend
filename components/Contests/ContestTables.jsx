import React, { useState } from 'react';
import { Table, Avatar, Input } from 'antd';


const initialPlayers = [
    { key: 1, name: 'Lionel Messi', position: 'RW', team: 'PSG', opp: 'MCI', salary: 12000, fppg: 35.6, SD: 8.2 },
    { key: 2, name: 'Cristiano Ronaldo', position: 'CF', team: 'MUN', opp: 'CHE', salary: 11000, fppg: 33.4, SD: 7.9 },
    { key: 3, name: 'Neymar Jr', position: 'LW', team: 'PSG', opp: 'MCI', salary: 10500, fppg: 30.1, SD: 7.0 },
    { key: 4, name: 'Kylian Mbappe', position: 'CF', team: 'PSG', opp: 'MCI', salary: 10800, fppg: 32.2, SD: 7.5 },
    { key: 5, name: 'Kevin De Bruyne', position: 'CAM', team: 'MCI', opp: 'PSG', salary: 10000, fppg: 28.3, SD: 6.8 },
    { key: 6, name: 'Robert Lewandowski', position: 'CF', team: 'BAR', opp: 'RMA', salary: 11500, fppg: 34.7, SD: 8.0 },
    { key: 7, name: 'Luka Modric', position: 'CM', team: 'RMA', opp: 'BAR', salary: 9200, fppg: 26.5, SD: 6.2 },
    { key: 8, name: 'Karim Benzema', position: 'CF', team: 'RMA', opp: 'BAR', salary: 11000, fppg: 33.1, SD: 7.6 },
    { key: 9, name: 'Erling Haaland', position: 'CF', team: 'MCI', opp: 'PSG', salary: 11800, fppg: 34.2, SD: 7.8 },
    { key: 10, name: 'Sergio Ramos', position: 'CB', team: 'PSG', opp: 'MCI', salary: 8500, fppg: 20.3, SD: 5.5 },
    { key: 11, name: 'Virgil van Dijk', position: 'CB', team: 'LIV', opp: 'MCI', salary: 8800, fppg: 21.1, SD: 5.7 },
    { key: 12, name: 'Mohamed Salah', position: 'RW', team: 'LIV', opp: 'MCI', salary: 11200, fppg: 31.8, SD: 7.3 },
    { key: 13, name: 'Sadio Mane', position: 'LW', team: 'BAY', opp: 'DOR', salary: 10900, fppg: 30.5, SD: 7.4 },
    { key: 14, name: 'Joshua Kimmich', position: 'CDM', team: 'BAY', opp: 'DOR', salary: 9400, fppg: 27.4, SD: 6.5 },
    { key: 15, name: 'Toni Kroos', position: 'CM', team: 'RMA', opp: 'BAR', salary: 9000, fppg: 25.6, SD: 6.0 },
    { key: 16, name: 'Alphonso Davies', position: 'LB', team: 'BAY', opp: 'DOR', salary: 8600, fppg: 22.2, SD: 5.8 },
    { key: 17, name: 'Trent Alexander-Arnold', position: 'RB', team: 'LIV', opp: 'MCI', salary: 8700, fppg: 22.7, SD: 5.9 },
    { key: 18, name: 'Raheem Sterling', position: 'LW', team: 'CHE', opp: 'MUN', salary: 10000, fppg: 29.0, SD: 6.9 },
    { key: 19, name: 'Jadon Sancho', position: 'RW', team: 'MUN', opp: 'CHE', salary: 9500, fppg: 27.0, SD: 6.7 },
    { key: 20, name: 'Phil Foden', position: 'CAM', team: 'MCI', opp: 'PSG', salary: 9300, fppg: 26.8, SD: 6.6 },
];

function ContestTables() {
    const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [activeButton, setActiveButton] = useState("All");
    const [searchText, setSearchText] = useState("");

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

    const columns = [
        { title: 'NAME', dataIndex: 'name', key: 'name' },
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
        <div  className='flex flex-col lg:flex-row gap-8'>
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
        </div>
    );
}

export default ContestTables;
