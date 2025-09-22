const HeadLine = ({ title, subTitle }) => {
    return (
        <div className="py-8">
            <h2
                className="text-4xl md:text-5xl font-bold mb-2 text-center 
                bg-gradient-to-tr from-green-500 w-fit mx-auto 
                bg-clip-text text-transparent  to-teal-500
                drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] 
                animate-bounce fontHeader pb-3"
            >
                {title}
            </h2>
            <p className="text-sm md:text-base text-gray-400 text-center pb-2">
                {subTitle}
            </p>
        </div>
    );
};

export default HeadLine;
