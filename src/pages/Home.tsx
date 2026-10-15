import { Hero } from '../components/sections/Hero';
import { ChildGrid } from '../components/sections/ChildGrid';
import { About20Years } from '../components/sections/About20Years';

export const Home = () => {
  return (
    <main>
      <Hero />
      <ChildGrid />
      <About20Years />
    </main>
  );
};
