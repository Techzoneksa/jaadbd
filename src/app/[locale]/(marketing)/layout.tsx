import { MarketingLayout } from "@/components/layout";

export default function MarketingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
