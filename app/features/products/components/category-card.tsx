import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/common/components/ui/card";

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
}

export default function CategoryCard({
  id,
  title,
  description,
}: CategoryCardProps) {
  return (
    <Link to={`/products/categories/${id}`} className="block">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title} <ChevronRightIcon className="size-6" />
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
