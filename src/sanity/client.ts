import Sanity from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Asset } from './types';

export class SanityClient extends Sanity {
  static projectId = 'hdnpvh8z';
  builder: ReturnType<typeof imageUrlBuilder>;

  constructor() {
    const projectDetails = {
      projectId: SanityClient.projectId,
      dataset: 'production',
      useCdn: true,
    };
    super(projectDetails);
    this.builder = imageUrlBuilder(projectDetails);
  }

  async getAssets() {
    const assetsQuery = /* groq */ `*[_type == 'asset'] | order(order asc) {
      ...,
      artists[] -> {
        name,
        webpage
      }
    }`;
    const assets: Asset[] = await this.fetch(assetsQuery);
    return assets;
  }

  async getAllAssetsGroupedBySeries() {
    const query = /* groq */ `*[_type == 'series'] | order(series asc) {
      assets[] -> { image }
    }`;
    const assets: { assets: [{ image: Asset['image'] }] }[] = await this.fetch(query);
    return assets;
  }

  async getAssetsBySeries(seriesNumber: string): Promise<Asset[]> {
    const seriesNo = Number(seriesNumber);
    if (isNaN(seriesNo)) throw new Error('seriesNumber is not a number');
    const assetsQuery = /* groq */ `*[_type == 'series' && series == $seriesNumber] | order(series asc) {
      assets[] -> {
        ...,
        artists[] -> {
          name,
          webpage
        }
      }
    }[0].assets`;
    const assets = await this.fetch(assetsQuery, { seriesNumber: seriesNo });
    return assets;
  }

  urlForImageSource(source: SanityImageSource) {
    return this.builder.image(source);
  }
}
