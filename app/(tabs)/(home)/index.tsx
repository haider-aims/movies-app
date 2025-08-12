import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text className='text-2xl font-bold text-blue-500 bg-yellow-200'>Home</Text>

      <Link href={'/movie/3'}> go to movie details </Link>
    </View>
  )
}

export default Home