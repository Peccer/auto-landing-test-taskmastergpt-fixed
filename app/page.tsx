import { getLandingContent } from '@/lib/content';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default async function HomePage() {
  const content = await getLandingContent();

  return (
    <main className={`min-h-screen theme-${content.theme}`}>
      <Hero content={content} />
      <Features content={content} />
      <CTA content={content} />
      <Footer content={content} />
    </main>
  );
}
