const LinkComponent = ({node,...props}) => {
  return (
    <a 
      {...props} 
      target="_blank" 
      rel="noopener noreferrer" 
    />
  )
};

export { LinkComponent }