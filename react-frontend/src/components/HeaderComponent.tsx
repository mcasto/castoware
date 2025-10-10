import cwLogo from '../assets/images/castoware-logo.jpeg'

const HeaderComponent = () => {
  return (
<>
<img
          src={cwLogo}
          alt="CastoWare Logo"

        />
        <div className="flex-1 mt-4">
          <p className="text-xl  leading-relaxed mb-4">
            CastoWare was founded in 1998 as a freelance software development operation and has specialized in web and web application development ever since. We also provide desktop application development for Windows, Mac, and Linux.
          </p>
          <p className="text-xl  leading-relaxed">
            Headquartered in Cuenca, Ecuador, we operate primarily on a remote model to keep projects cost-effective and efficient. We collaborate with clients through video calls and, when it adds value, through in-person meetings.
          </p>
        </div>
</>
  );
};

export default HeaderComponent;
