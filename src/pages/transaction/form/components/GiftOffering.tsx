// import { Button, Col, Form, Input, InputNumber, Row, Select, Space } from 'antd'
// import { useForm } from 'antd/es/form/Form'
// import { useTranslation } from 'react-i18next'
// import { GiftOffering } from '../../../model/model'

// const GiftOfferingForm: React.FC<{
//   onCancel: () => void
//   offerID?: number
// }> = ({ onCancel, offerID }) => {
//   const [t] = useTranslation('translation')
//   const [form] = useForm()

  // const findTransacID = transactionForm.data.offerings.find(
  //   (value) => value.ID === offerID
  // )

  // useEffect(() => {
  //   if (offerID) {
  //     form.setFieldsValue({
  //       staffName: findTransacID!.staffName,
  //       department: findTransacID!.department,
  //       amount: findTransacID!.amount,
  //     })
  //   }
  // }, [])

  // const onSubmit = async (value: GiftOffering) => {
  //   if (offerID) {
      // const editOffer: Offering = {
      //   id: offerID,
      //   staffName: findTransacID!.staffName,
      //   department: findTransacID!.department,
      //   kind: 'Gift',
      //   amount: parseFloat(value.amount),
      //   projectName: '',
      //   startDate: '',
      //   dueDate: '',
      //   descriptions: '',
      // }
      // const updateOffering = transactionForm.data.offerings.map((offerr) =>
      //   offerr.ID === offerID ? editOffer : offerr
      // )

      // transactionForm.setData({
      //   ...transactionForm.data,
      //   offerings: updateOffering,
      // })

    //   onCancel()
    // } else {
      // const offer: Offering = {
      //   id: transactionForm.data.offerings.length + 1,
      //   staffName: transactionForm.data.staffName,
      //   department: transactionForm.data.department,
      //   kind: 'Gift',
      //   amount: parseFloat(value.amount),
      //   projectName: '',
      //   startDate: '',
      //   dueDate: '',
      //   descriptions: '',
      // }
      // transactionForm.setData({
      //   ...transactionForm.data,
      //   offerings: [...transactionForm.data.offerings, offer],
      // })
      // onCancel()
  //   }
  // }

  // const initialValues = {
  //   staffName: transactionForm.data.staffName,
  //   departmentCode: transactionForm.data.department,
  // }

//   return (
//     <>
//       <h1 style={{ marginBottom: 10 }}>Gift</h1>
//       <Form
//         onFinish={onSubmit}
//         layout="vertical"
//         form={form}
//         // initialValues={initialValues}
//       >
//         <Space direction="vertical" size={20} style={{ display: 'flex' }}>
//           <Row gutter={15} style={{ rowGap: 20 }}>
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
//               <Form.Item name="staffName" hasFeedback>
//                 <Input allowClear size="large" disabled />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
//               <Form.Item name={'departmentCode'} hasFeedback>
//                 <Select size="large" disabled />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={15} style={{ rowGap: 20 }}>
//             <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//               <Form.Item
//                 name={'amount'}
//                 rules={[
//                   { required: true, message: `${t('transacValidate.amount')}` },
//                 ]}
//                 hasFeedback
//               >
//                 <InputNumber<string>
//                   style={{ width: '100%' }}
//                   stringMode
//                   min="0"
//                   minLength={1}
//                   step={0.01}
//                   formatter={(value) =>
//                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//                   }
//                   parser={(value) => {
//                     if (value) {
//                       const amount = parseFloat(
//                         value.replace(/\$\s?|(,*)/g, '')
//                       )
//                       return amount.toFixed(2)
//                     } else {
//                       return ''
//                     }
//                   }}
//                   size="large"
//                   placeholder={t('transacForm.amount')}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row justify={'end'} gutter={15}>
//             <Col xs={24} sm={24} md={12} lg={12} xl={12}>
//               <Row gutter={15} style={{ rowGap: 10 }}>
//                 <Col xs={24} sm={24} md={12} lg={12} xl={12}>
//                   <Button
//                     onClick={onCancel}
//                     size={'large'}
//                     style={{ width: '100%' }}
//                     htmlType="button"
//                   >
//                     {t('transacButton.cancel')}
//                   </Button>
//                 </Col>
//                 <Col xs={24} sm={24} md={12} lg={12} xl={12}>
//                   <Form.Item>
//                     <Button
//                       size={'large'}
//                       style={{ width: '100%' }}
//                       type="primary"
//                       htmlType="submit"
//                     >
//                       {offerID
//                         ? t('transacButton.edit')
//                         : t('transacButton.addData')}
//                     </Button>
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Space>
//       </Form>
//     </>
//   )
// }

// export default GiftOfferingForm
