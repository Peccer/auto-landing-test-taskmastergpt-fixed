import fs from 'fs';
import path from 'path';

export interface LandingContent {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  badges?: string[];
  heroImage?: string;
  logos?: string[];
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  cta?: {
    title: string;
    subtitle: string;
    button: {
      label: string;
      href: string;
    };
  };
  theme: 'dark-glossy' | 'light-clean' | 'neon-gradient';
  metadata?: {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
  };
}

export async function getLandingContent(): Promise<LandingContent> {
  try {
    // Try to read from landing.json first
    const contentPath = path.join(process.cwd(), 'content', 'landing.json');
    
    if (fs.existsSync(contentPath)) {
      const fileContent = fs.readFileSync(contentPath, 'utf-8');
      return JSON.parse(fileContent) as LandingContent;
    }
    
    // Fallback to example.json if landing.json doesn't exist
    const examplePath = path.join(process.cwd(), 'content', 'example.json');
    if (fs.existsSync(examplePath)) {
      const fileContent = fs.readFileSync(examplePath, 'utf-8');
      return JSON.parse(fileContent) as LandingContent;
    }
    
    // Ultimate fallback - return default content
    return getDefaultContent();
  } catch (error) {
    console.error('Error loading landing content:', error);
    return getDefaultContent();
  }
}

function getDefaultContent(): LandingContent {
  return {
    eyebrow: "Discover the power of",
    title: "Your Amazing Product",
    subtitle: "Build something amazing with our cutting-edge solution",
    primaryCta: {
      label: "Get Started",
      href: "#"
    },
    secondaryCta: {
      label: "Learn More",
      href: "#"
    },
    badges: ["Fast", "Secure", "Reliable"],
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    logos: [],
    features: [
      {
        title: "Lightning Fast",
        description: "Experience blazing fast performance that keeps your users engaged",
        icon: "bolt"
      },
      {
        title: "Enterprise Security",
        description: "Bank-grade security to protect your data and your users",
        icon: "shield"
      },
      {
        title: "Infinite Scale",
        description: "Scales seamlessly with your growing business needs",
        icon: "rocket"
      }
    ],
    cta: {
      title: "Ready to get started?",
      subtitle: "Join thousands of satisfied customers today.",
      button: {
        label: "Get Started",
        href: "#"
      }
    },
    theme: "dark-glossy",
    metadata: {
      title: "Your Amazing Product - Landing Page",
      description: "Build something amazing with our cutting-edge solution",
      keywords: ["product", "amazing", "solution"],
      twitterCard: "summary_large_image"
    }
  };
}
