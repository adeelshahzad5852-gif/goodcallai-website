import type { Metadata } from "next";
import { NotFoundPage } from "./components/Site";

export const metadata: Metadata = {
  title: "Page Not Found | GoodcallAI",
  description: "The requested GoodcallAI page could not be found.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
