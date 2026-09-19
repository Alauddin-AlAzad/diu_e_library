import { Link } from "react-router-dom"; // react-router-dom ব্যবহার নিশ্চিত করো

const BookCard = ({ book }) => {
  const {
    bookName,
    authorName,
    quantity,
    rating,
    category,
    imgUrl,
    _id
  } = book || {};

  return (
    // block এবং w-full দিয়ে Link-কে পুরো স্পেস নিতে বলা হলো
    <Link to={`/bookdetails/${_id}`} className="block w-full h-full">
      <div className="w-full h-full bg-[#F0F6FF] border border-[#2F6FB2]/20 shadow-md hover:shadow-xl transition duration-300 rounded-lg overflow-hidden flex flex-col">

        {/* ইমেজ কন্টেইনার ফিক্সড অনুপাত */}
        <div className="relative w-full aspect-[3/4] flex-shrink-0">
          <img
            className="w-full h-full object-cover object-center"
            src={imgUrl}
            alt={bookName}
          />

          <div className="h-10 w-10 bg-[#1E4E8C] rounded-full absolute top-2 right-2 ring-2 ring-white flex flex-col items-center justify-center text-white text-[10px] shadow">
            <span className="w-4 border-t border-white"></span>
            <span className="font-bold leading-none">{quantity}</span>
            <span className="uppercase leading-none">pcs</span>
            <span className="w-4 border-t border-white"></span>
          </div>
        </div>

        {/* টেক্সট কন্টেইনার */}
        <div className="flex-1 px-3 py-3 border-t border-dotted border-[#2F6FB2]/30 flex flex-col justify-between">

          <div className="min-w-0">
            {/* ফিক্সড হাইটের জন্য h-[36px] যাতে নাম ১ লাইন বা ২ লাইন হলেও কার্ডের সাইজ না বদলায় */}
            <h2 className="text-sm font-semibold leading-tight line-clamp-2 text-[#1E4E8C] h-[36px]">
              {bookName}
            </h2>

            <p className="text-xs text-gray-600 mt-1 truncate">
              Author: <span className="text-gray-800">{authorName}</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-3 pt-2">
            <span className="text-yellow-500 text-sm font-semibold">
              {rating} ★
            </span>

            <span className="text-[11px] px-2 py-[2px] bg-[#2F6FB2] text-white rounded">
              {category}
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default BookCard;