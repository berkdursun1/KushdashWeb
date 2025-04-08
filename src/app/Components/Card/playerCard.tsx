import Image from 'next/image'

export default function PlayerCard({ name, surname, age , image }) {
    return (
      <div className="border rounded-2xl shadow-md p-4 bg-white text-center w-full h-fit">
        
        <Image src={`/${image}.jpeg`} width={700} height={700} alt="Picture" className=" object-cover rounded-full"></Image>
        <div className='left'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foot</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>

        

        </div>
        <div className='right'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foot</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>

        </div>
        <div className='right'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foot</label>
        <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-fit p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="?" disabled></input>

        </div>
        
        
        
      </div>
    );
  }