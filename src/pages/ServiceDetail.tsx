import { useParams } from "react-router-dom";
import { allServicePages } from "@/data/servicePages";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import NotFound from "./NotFound";

const ServiceDetail = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const page = allServicePages.find((p) => p.category === category && p.slug === slug);

  if (!page) return <NotFound />;

  const related = allServicePages.filter((p) => p.category === page.category && p.slug !== page.slug);

  return <ServicePageTemplate page={page} relatedPages={related} />;
};

export default ServiceDetail;
