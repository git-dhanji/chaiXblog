import LogoImage from '../assets/green-tea.png';

function Logo({
  width = '40px',
  height='40px',
  text = 'logo',
  fontSize = '',
  type = '',
  ...props
}) {
  // Checking the type to determine the rendering logic
  if (type === "text") {
    return (
      <div className={`font-[${fontSize}] width-[${width}]`} {...props}>
        {text}
      </div>
    );
  }

  // Returning the image if type is not "text"
  return (
    <div style={{width:width, height:width}} className={` relative overflow-hidden`} {...props}>
      <img src={LogoImage} alt="logo image" />
    </div>
  );
}

export default Logo;
