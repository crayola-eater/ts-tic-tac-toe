type Props = {
  children: React.ReactNode;
};

export default function ResponsiveWrapper({ children }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center w-11/12 max-w-max space-y-3">
        {children}
      </div>
    </div>
  );
}
