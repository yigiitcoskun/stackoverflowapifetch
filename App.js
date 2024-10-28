import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl, SafeAreaView } from 'react-native';
import { Item } from "./components/item";
import axios from 'axios';
import {Header} from "./components/Header";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchUser(page);
  }, []);

  const fetchUser = (page) => {
    const url = `https://api.stackexchange.com/2.2/users?page=${page}&order=desc&sort=reputation&site=stackoverflow`;
    if (page === 1) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    axios.get(url).then((res) => {
      if (page === 1) {
        setData(res.data.items);
      } else {
        setData(prevData => [...prevData, ...res.data.items]);
      }
      setLoading(false);
      setIsRefresh(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
      setIsRefresh(false);
    });
  };

  const _renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  const onRefresh = () => {
    setIsRefresh(true);
    setPage(1);
    fetchUser(1); 
  };

  const loadMore = () => {
    if (!loading) {
      const newPage = page + 1;
      setPage(newPage);
      fetchUser(newPage);
    }
  };
  const renderFooter = () => {
    if(isLoadingMore){
      return <Text> Yükleniyor... </Text>
    }
  }

  return (
      <SafeAreaView style={styles.container}>
        <Header />
        {loading ? (
            <View style={{justifyContent:'center', alignItems:'center'}}><Text> Yükleniyor...</Text></View>
        ) : (
            <FlatList
                style={{ padding: 10, backgroundColor: "#ddd" }}
                data={data}
                refreshControl={
                  <RefreshControl
                      refreshing={isRefresh}
                      onRefresh={onRefresh}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
                onEndReachedThreshold={0.4}
                onEndReached={loadMore}
                ListFooterComponent={renderFooter}
            />
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
});
