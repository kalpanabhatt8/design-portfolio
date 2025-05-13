const Home = () => {
  const thumbnailURL = 'https://img.youtube.com/vi/jkJAzNpy2aA/hqdefault.jpg'; // Replace with your video ID

  return (
    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white ">
      <img
        src={thumbnailURL}
        alt="Now Playing"
        className="w-full h-full object-cover animate-spin-slow"
      />
    </div>
  );
};

export default Home;
