const Home: React.FC = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/mock-test`)
  const data = await res.json()

  return <div>{JSON.stringify(data)}</div>
}

export default Home
