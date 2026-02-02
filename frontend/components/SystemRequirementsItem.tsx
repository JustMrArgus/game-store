interface SystemRequirementsItemProps {
  title: string;
  value: string;
}

const SystemRequirementsItem = ({
  title,
  value,
}: SystemRequirementsItemProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-[#8d8d8f]">{title}</p>
      <p className="max-w-100">{value}</p>
    </div>
  );
};

export default SystemRequirementsItem;
