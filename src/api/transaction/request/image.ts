export interface ImageRequest {
  imageName: string
}

export type CreateImageRequest = Omit<ImageRequest, 'id' | 'transactionId'>
