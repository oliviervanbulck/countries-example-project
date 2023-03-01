import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

export default function LoadingComponent() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col font-bold gap-5">
                Loading...
                <FontAwesomeIcon icon={faCircleNotch} spin size="4x" />
            </div>
        </div>
    );
}