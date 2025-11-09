import Hero from "../components/hero/hero";
import NewCategories from "../components/new-categories/new-categories";
import Categories from "../components/сategories/сategories";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories/>
      <NewCategories/>
    </div>
  );
}
