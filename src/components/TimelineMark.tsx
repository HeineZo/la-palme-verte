export default function TimelineMark({
    year,
    title,
    text,
}: {
    year: number;
    title: string;
    text: string;
}) {
    return (
        <div className="flex h-44">
            <div className="flex flex-col w-1/12">
                <div className="h-14">
                    <svg>
                        <circle cx="20" cy="20" r="20" fill="grey" />
                    </svg>
                </div>
                <div>
                    <svg>
                        <line
                            x1="20"
                            y1="0"
                            x2="20"
                            y2="100"
                            style={{
                                stroke: "rgb(0,0,0)",
                                strokeWidth: "2.5px",
                            }}
                        />
                    </svg>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p>{year}</p>
                <h1 className="text-2xl">{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    );
}
