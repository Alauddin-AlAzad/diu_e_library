import { motion } from 'framer-motion';

import { Link } from 'react-router';


const Slider = ({ image, text, subtext, button, activeIndex, slideIndex }) => {


    return (
        <div
            className="w-full aspect-[18/9] lg:aspect-[32/9] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col justify-center items-start sm:items-center text-left sm:text-center px-5">

        
                <motion.div
                    key={`${activeIndex}-${slideIndex}`}  
                    initial={{ opacity: 0, scale: 2.1, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.95,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* Heading */}
                    <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
                        {text}
                    </h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.6 }}
                        className="mt-3 text-gray-200 text-sm sm:text-base md:text-lg"
                    >
                        {subtext}
                    </motion.p>

                    {/* Button */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.7,
                            type: 'spring',
                            stiffness: 160,
                            damping: 16,
                        }}
                        className="mt-5 flex gap-3 flex-col sm:flex-row "
                    >
                        {button?.map((btn, i) => (
                            <div className='w-full items-center'>

                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.94 }}
                                >
                                    <Link
                                        to={btn.to}
                                        className="btn text-white bg-[#0051f9]"
                                    >
                                        {btn.label}
                                    </Link>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                </motion.div>

            </div>
        </div>
    );
};

export default Slider;
