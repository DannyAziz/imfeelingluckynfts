import { GraphQLClient } from 'graphql-request';
import { AssetSearchQuery } from './queries';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { OpenSeaPort, Network } from 'opensea-js';

const NETWORK = process.env.NODE_ENV === 'production' ? 'Main' : 'Rinkeby';

const chainId = NETWORK === 'Rinkeby' ? 4 : 1;

const provider = new WalletConnectProvider({
  chainId,
  infuraId: process.env.NEXT_PUBLIC_INFURA,
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask'],
  },
});

const seaport = new OpenSeaPort(provider, {
  networkName: Network[NETWORK],
});

function getRandomArbitrary(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}

const sortOptions = [
  'LISTING_DATE',
  'CREATED_DATE',
  'LAST_SALE_DATE',
  'LAST_TRANSFER_DATE',
  'EXPIRATION_DATE',
  'PRICE',
  'LAST_SALE_PRICE',
  'VIEWER_COUNT',
  'FAVORITE_COUNT',
];

const openSeaQuery = async (cursor?: string, price?: number) => {
  let priceFilter = null;

  if (price) {
    priceFilter = {
      symbol: 'ETH',
      max: price,
    };
  }

  const variables = {
    categories: null,
    chains: [NETWORK === 'Rinkeby' ? NETWORK : 'ETHEREUM'],
    collection: null,
    collectionQuery: null,
    collectionSortBy: 'SEVEN_DAY_VOLUME',
    collections: [],
    count: 32,
    cursor,
    identity: null,
    includeHiddenCollections: false,
    numericTraits: null,
    paymentAssets: null,
    priceFilter,
    query: '',
    resultModel: 'ASSETS',
    showContextMenu: false,
    shouldShowQuantity: false,
    sortAscending: false,
    sortBy: sortOptions[Math.floor(Math.random() * sortOptions.length)],
    stringTraits: null,
    toggles: ['BUY_NOW'],
    creator: null,
    assetOwner: null,
    isPrivate: null,
    safelistRequestStatuses: null,
  };

  const graphQLClient = new GraphQLClient(
    `https://${
      NETWORK === 'Rinkeby' ? 'testnets-api' : 'api'
    }.opensea.io/graphql/`
  );

  return graphQLClient.request(AssetSearchQuery, variables);
};

const getToken = async (price: number): Promise<any> => {
  let token = null;
  let order = null;
  console.log(`Finding NFT with a price UP TO ${price} ETH`);

  while (!token) {
    const tokenNum = getRandomArbitrary(0, 10000);
    console.log('tokenNum', tokenNum);
    const cursor = btoa(`arrayconnection:${tokenNum}`);

    const tokenQuery = await openSeaQuery(cursor, price);
    console.log(tokenQuery.query.search.edges);
    if (tokenQuery.query.search.edges.length) {
      const potentialToken = tokenQuery.query.search.edges[0].node;

      console.log(potentialToken);

      try {
        const potentialOrder = await seaport.api.getOrder({
          side: 1,
          asset_contract_address: potentialToken.asset.assetContract.address,
          token_id: potentialToken.asset.tokenId,
        });
        token = potentialToken;
        order = potentialOrder;
      } catch (error) {}
    }
  }

  return { token, order };
};

export default getToken;
