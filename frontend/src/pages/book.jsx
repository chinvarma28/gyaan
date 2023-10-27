import { useParams } from 'react-router-dom'
export default function Book() {
    const { id } = useParams();
    console.log(id);
    return (
        <div className='flex'>
            <div className='w-96 px-10 mt-10'>
                <img src="https://th.bing.com/th/id/R.847ff818eb060a80aa401c0273ee49ef?rik=PitBxG7NXly9yA&riu=http%3a%2f%2fi2.wp.com%2fgeekdad.com%2fwp-content%2fuploads%2f2013%2f02%2fHP1-Kibuishi.jpg&ehk=uafYYv3yMqpRGlecJf0Si6SPSZwksDcZUzc982%2byhlQ%3d&risl=&pid=ImgRaw&r=0"
                    alt=""
                    className="w-full  object-cover hover:opacity-80 transition-opacity duration-300 ease-in-out rounded-lg 
                  "
                />
            </div>
            <div className='
            flex flex-col w-full h-full
            '>
                <div className='px-10 mt-10'>
                    <h1 className='text-3xl font-bold'>Harry Potter and the Philosopher's Stone</h1>
                    <p className='text-gray-400'>By J.K. Rowling</p>
                    <p className='text-gray-400'>Genre: Fantasy</p>
                    <p className='text-gray-400'>Rating: 4.5 &#9733;</p>
                    <p className='text-gray-400'>Price: ₹ 100</p>
                </div>
                <div className='px-10 mt-10'>
                    <p className='text-justify'>
                        Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.
                    </p>
                </div>
            </div>
        </div>
    )
}
