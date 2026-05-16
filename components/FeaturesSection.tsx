import {
  Brain,
  Search,
  Share2,
  BarChart3,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Brain,
    title: "AI Summaries",
    description:
      "Generate concise summaries and action items instantly.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find notes quickly using intelligent search and tags.",
  },
  {
    icon: Share2,
    title: "Public Sharing",
    description:
      "Share notes publicly with secure links and visibility controls.",
  },
  {
    icon: BarChart3,
    title: "Insights Dashboard",
    description:
      "Track productivity, AI usage, and weekly activity visually.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold">
            Built for modern productivity
          </h2>

          <p className="mt-4 text-zinc-500">
            Everything you need to manage notes,
            collaborate, and work smarter with AI.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}