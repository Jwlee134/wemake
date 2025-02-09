import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams } from "react-router";

interface ProductPaginationProps {
  totalPages: number;
}

export default function ProductPagination({
  totalPages,
}: ProductPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 ? (
          <>
            <PaginationItem>
              <PaginationPrevious to={`?page=${page - 1}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to={`?page=${page - 1}`}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}
        <PaginationItem>
          <PaginationLink to={`?page=${page}`} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink to={`?page=${page + 1}`}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            {page + 1 === totalPages ? null : (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext to={`?page=${page + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
