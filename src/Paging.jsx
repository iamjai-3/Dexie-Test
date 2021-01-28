import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paging = (props) => {
	const { itemsCount, pageSize, currentPage, onPageChange } = props;
	const [pages, setPages] = useState([]);

	const totalPages = Math.ceil(itemsCount / pageSize);
	const maxPages = totalPages >= 10 ? 10 : totalPages;

	useEffect(() => {
		// Page Range Calculation
		const range = () => {
			let startPage = 0;
			let endPage = 0;
			const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
			const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

			if (currentPage <= maxPagesBeforeCurrentPage) {
				// current page near the start
				startPage = 1;
				endPage = maxPages;
			} else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
				// current page near the end
				startPage = totalPages - maxPages + 1;
				endPage = totalPages;
			} else {
				// current page somewhere in the middle
				startPage = currentPage - maxPagesBeforeCurrentPage;
				endPage = currentPage + maxPagesAfterCurrentPage;
			}
			setPages(Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i));
		};
		range();
	}, [props]);

	return (
		<div className="text-right">
			<Pagination aria-label="Page navigation" className="d-inline-block">
				<PaginationItem>
					<PaginationLink onClick={(e) => onPageChange(1, e)} first href="#" title="First" />
				</PaginationItem>
				<PaginationItem disabled={currentPage <= 1}>
					<PaginationLink
						onClick={(e) => onPageChange(currentPage - 1, e)}
						previous
						href="#"
						title="Previous"
					/>
				</PaginationItem>

				{pages.map((page, i) => (
					<PaginationItem active={page === currentPage} key={page}>
						<PaginationLink onClick={(e) => onPageChange(page, e)} href="#">
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem disabled={currentPage >= totalPages}>
					<PaginationLink onClick={(e) => onPageChange(currentPage + 1, e)} next href="#" title="Next" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink onClick={(e) => onPageChange(totalPages, e)} last href="#" title="Last" />
				</PaginationItem>
			</Pagination>
		</div>
	);
};

export default Paging;
