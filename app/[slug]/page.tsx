import { IndustryPage, SimplePage } from "../components/Site";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "hvac" || slug === "plumbers" || slug === "electricians") {
    return <IndustryPage kind={slug} />;
  }
  return <SimplePage slug={slug} />;
}
