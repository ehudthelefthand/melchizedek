export interface EvidenceDeleteRequest {
  imagesName: string[]
  transactionId: number
}

export type CreateImageRequest = Omit<
  EvidenceDeleteRequest,
  'id' | 'transactionId'
>
