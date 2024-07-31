export default function Container({ children, className }) {
    return (
        <div
            className={`container mx-auto max-w-screen-xl xl:px-0 ${className}`}
        >
            {children}
        </div>
    );
}
