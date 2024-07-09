import CustomImage from "./CustomImage";
import InfoCardWithIcon, { InfoCardWithIconProps } from "./InfoCardWithIcon";
import StatusBadge, { StatusBadgeProps } from "./table/StatusBadge";

interface ICustomerDetailCard {
    background?: string;
    avatar?: string;
    status: StatusBadgeProps;
    items: InfoCardWithIconProps[];
    name: string;
}

const CustomerDetailCard = ({ background, avatar, status, items, name }: ICustomerDetailCard) => {
    const defaultBackground = background || "src/assets/images/Background.png";
    return (
        <div className="w-full bg-white rounded-xl p-2">
            <div className="relative">
                <CustomImage className="w-full h-[148px] object-cover rounded" alt={`background with ${name}`} src={defaultBackground} />
                {avatar ? (
                    <CustomImage
                        className="w-[148px] h-[148px] rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                        alt={`avatar with ${name}`}
                        src={avatar}
                    />
                ) : (
                    <div
                        className="w-[148px] h-[148px] rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-300"
                    >
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 items-center border-b mx-5 border-gray-10 pb-6 mt-[80px]">
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
