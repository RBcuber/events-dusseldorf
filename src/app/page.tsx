import Hero from "../components/hero/hero";
import Categories from "../components/сategories/сategories";

import NewCategories from "../components/new-categories/new-categories";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <NewCategories />
    </div>
  );
}

