const Header = () => {
  const styles: React.CSSProperties = {
    background: 'rgb(19, 201, 186)',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };
  return <header style={styles}><h3>Calculation Table</h3></header>;
};

export default Header;
