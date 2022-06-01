import { useEffect, useState } from "react";

export default function Pagination({ data, RenderComponent, title, pageLimit, dataLimit, tablePagination }) {
    const [pages] = useState(Math.round(data.length / dataLimit) + 1);
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        // not yet implemented
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <>
            {/* show the posts, 10 posts at a time */}
            {tablePagination ? (
                getPaginatedData().map((data, idx) => <RenderComponent key={idx} {...data} />)
            ) : (
                <div className="dataContainer d-flex justify-content-center flex-wrap">
                    <h1>{title}</h1>

                    {getPaginatedData().map((data, idx) => (
                        <RenderComponent key={idx} {...data} />
                    ))}
                </div>
            )}

            {/* show the pagiantion
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
            {data.length > dataLimit && (
                <div className="pagination">
                    {/* previous button */}
                    <button onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
                        prev
                    </button>

                    {/* show page numbers */}
                    {getPaginationGroup().map((item, index) => (
                        <button key={index} onClick={changePage} className={`paginationItem ${currentPage === item ? "active" : ""}`}>
                            <span>{item}</span>
                        </button>
                    ))}

                    {/* next button */}
                    <button onClick={goToNextPage} className={`next ${currentPage >= pages - 1 ? "disabled" : ""}`}>
                        next
                    </button>
                </div>
            )}
        </>
    );
}
