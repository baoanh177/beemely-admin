import CustomerAvatar from "./CustomerAvatar";
import InfoCardWithIcon, { InfoCardWithIconProps } from "./InfoCardWithIcon";
import StatusBadge, { StatusBadgeProps } from "./table/StatusBadge";
import DeafaultBgDeatailCard from "@/assets/images/deafaultBgDeatailCard.png";

interface ICustomerDetailCard {
    background?: string;
    avatar?: string;
    status: StatusBadgeProps;
    items: InfoCardWithIconProps[];
    name: string;
}

const CustomerDetailCard = ({ background, avatar, status, items, name }: ICustomerDetailCard) => {
    const isImageValid = (path: string | undefined): boolean => {
        if (!path) return false;
        const image = new Image();
        image.src = path;
        return image.complete && image.naturalWidth !== 0;
    };

    const defaultBackground = background && isImageValid(background) ? background : DeafaultBgDeatailCard;
    return (
        <div className="w-full bg-white rounded-xl p-2">
            <div className="relative">
                <img className="w-full h-[148px] object-cover rounded" alt={`background with ${name}`} src={defaultBackground} />
                <CustomerAvatar
                    className="w-[148px] h-[148px] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                    alt={`avatar with ${name}`}
                    size="large"
                    src={avatar}
                />
            </div>
            <div className="flex flex-col gap-2 items-center border-b border-gray-100 pb-6 mt-[80px]">
                <div className="text-l-semibold">{name}</div>
                <StatusBadge color={status.color} text={status.text} />
            </div>
            <div className="p-4 pt-6 flex flex-col gap-4">
                {items.map((item, index) => (
                    <InfoCardWithIcon
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </div>
        </div>
    );
}

export default CustomerDetailCard;
