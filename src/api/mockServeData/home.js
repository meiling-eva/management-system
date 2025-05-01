// mock data
import Mock from 'mockjs'

// list 
let List = []
export default {
    getStatisticalData: () => {
        //Mock.Random.float generate random float number 100 and 8000
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    Apple: Mock.Random.float(100, 3000, 0, 0),
                    Huawei: Mock.Random.float(100, 3000, 0, 0),
                    Oppo: Mock.Random.float(100, 3000, 0, 0),
                    OnePlus: Mock.Random.float(100, 3000, 0, 0),
                    SamSung: Mock.Random.float(100, 3000, 0, 0),
                    Mi: Mock.Random.float(100, 3000, 0, 0)
                })
            )
        }
        return {
            code: 20000,
            data: {
                // pie chart
                videoData: [
                    {
                        name: 'Mi',
                        value: 1199
                    },
                    {
                        name: 'Apple',
                        value: 2999
                    },
                    {
                        name: 'OnePlus',
                        value: 1500
                    },
                    {
                        name: 'Oppo',
                        value: 1299
                    },
                    {
                        name: 'Huawei',
                        value: 2800
                    },
                    {
                        name: 'SamSung',
                        value: 1500
                    }
                ],
                // bar chart
                userData: [
                    {
                        date: 'Mon',
                        new: 15,
                        active: 200
                    },
                    {
                        date: 'Tue',
                        new: 20,
                        active: 500
                    },
                    {
                        date: 'Wed',
                        new: 32,
                        active: 550
                    },
                    {
                        date: 'Thu',
                        new: 100,
                        active: 800
                    },
                    {
                        date: 'Fri',
                        new: 65,
                        active: 550
                    },
                    {
                        date: 'Sat',
                        new: 93,
                        active: 770
                    },
                    {
                        date: 'Sun',
                        new: 103,
                        active: 170
                    }
                ],
                // line chart
                orderData: {
                    date: ['1 April', '2 April', '3 April', '4 April', '5 April', '6 April', '7 April'],
                    data: List
                },
                tableData: [
                    {
                        brand: 'Oppo',
                        dailySales: 500,
                        monthSales: 3500,
                        totalSales: 22000
                    },
                    {
                        brand: 'OnePlus',
                        dailySales: 300,
                        monthSales: 2200,
                        totalSales: 24000
                    },
                    {
                        brand: 'Apple',
                        dailySales: 800,
                        monthSales: 4500,
                        totalSales: 65000
                    },
                    {
                        brand: 'Mi',
                        dailySales: 1200,
                        monthSales: 6500,
                        totalSales: 45000
                    },
                    {
                        brand: 'SamSung',
                        dailySales: 300,
                        monthSales: 2000,
                        totalSales: 34000
                    },
                    {
                        brand: 'Huawei',
                        dailySales: 350,
                        monthSales: 3000,
                        totalSales: 22000
                    }
                ]
            }
        }
    }
}
