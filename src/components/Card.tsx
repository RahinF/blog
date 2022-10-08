const Card = () => {
  return (
    <section>
      <div className="h-52 overflow-hidden object-cover">
        <img
          src="https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
      <header className="mt-4 flex justify-between gap-2 border-b pb-4">
        <h2 className="text font-medium line-clamp-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel suscipit
          quaerat architecto iure voluptates. Rem, magni. Voluptates, odit?
          Nulla odit eaque laborum ullam nesciunt, optio harum exercitationem
          vel repudiandae ut.
        </h2>
        <div className="flex shrink-0 flex-col">
          <div className="self-end text-xl font-medium">09</div>
          <div>June 2022</div>
        </div>
      </header>

      <footer className="mt-2 text-sm">
        <span className="after-bullet">John Smith</span>
        <span className="after-bullet">3 min read</span>
        <span>Thoughts</span>
      </footer>
    </section>
  );
};

export default Card;
