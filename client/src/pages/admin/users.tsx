import Table from '../../components/table'
import { createColumnHelper,type ColumnDef } from '@tanstack/react-table';
import type { User } from '../../types';
import Button from '../../components/button';
import DropDown from '../../components/dropDown';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaTag } from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';

  const data: User[] = [
    {
      id: "1",
      name: "سیما احمدی",
      email: "simahamadi@example.com",
      phone: "+98 912 345 6789",
      gender: "female",
      age: 28,
      role: "customer",
      totalOrders: 24,
      totalSpent: 12500000, // in IRR
      address: {
        street: "خیابان ولیعصر، پلاک 125",
        city: "تهران",
        state: "تهران",
        postalCode: "15647",
        country: "ایران"
      },
      avatar: "https://i.pravatar.cc/150?img=12",
    
    },
    {
      id: "2",
      name: "محمدرضا کریمی",
      email: "karimi@example.com",
      phone: "+98 935 123 4567",
      gender: "male",
      age: 35,
      role: "vendor",
      totalOrders: 0,
      totalSpent: 0,
      address: {
        street: "خیابان فاطمی، پلاک 89",
        city: "اصفهان",
        state: "اصفهان",
        postalCode: "81947",
        country: "ایران"
      },
      avatar: "https://i.pravatar.cc/150?img=32",
    
    },
    {
      id: "3",
      name: "فاطمه رضایی",
      email: "rezayi@example.com",
      phone: "+98 910 987 6543",
      gender: "female",
      age: 22,
      role: "customer",
      totalOrders: 1,
      totalSpent: 450000,
      address: {
        street: "بلوار کشاورز، پلاک 45",
        city: "مشهد",
        state: "خراسان رضوی",
        postalCode: "91779",
        country: "ایران"
      },
      avatar: "https://i.pravatar.cc/150?img=22",
     
    },
    {
      id: "4",
      name: "Ali Mohammadi",
      email: "ali.m@example.com",
      phone: "+1 555 123 4567",
      gender: "male",
      age: 31,
      role: "customer",
      totalOrders: 18,
      totalSpent: 890000,
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA"
      },
      avatar: "https://i.pravatar.cc/150?img=41",
    
    },
    {
      id: "5",
      name: "زهرا حسن زاده",
      email: "z.hasanzadeh@example.com",
      phone: "+98 938 567 8901",
      gender: "female",
      age: 29,
      role: "customer",
      totalOrders: 7,
      totalSpent: 3200000,
      address: {
        street: "خیابان انقلاب، پلاک 200",
        city: "تهران",
        state: "تهران",
        postalCode: "14657",
        country: "ایران"
      },
      avatar: "https://i.pravatar.cc/150?img=18",
  
    }
  ];
  type ModifiedUserType=User & {removeUser:any,changingRole:any}
  const columnHelper = createColumnHelper<ModifiedUserType>();
  const createModifiedData = (users: User[]): ModifiedUserType[] => {
    return users.map(user => ({
      ...user,
      removeUser: () => {
        console.log(`Removing user: ${user.name}`);
      },
      changingRole: () => {
        console.log(`Changing role for user: ${user.name}`);
      }
    }));
  };
  const modifiedData: ModifiedUserType[] = createModifiedData(data);

  const columns: ColumnDef<ModifiedUserType, any>[] = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "نام",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <img 
            src={info.row.original.avatar} 
            alt={info.getValue()} 
            className="w-8  rounded-full object-cover"
          />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      header: "ایمیل",
      cell: (info) => (
        <a 
          href={`mailto:${info.getValue()}`} 
          className="text-blue-600 hover:underline"
        >
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("phone", {
      header: "تلفن",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gender", {
      header: "جنسیت",
      cell: (info) => {
        const genderMap = {
          male: "مرد",
          female: "زن",
          other: "سایر"
        };
        return <p className=" w-16"> {genderMap[info.getValue() as keyof typeof genderMap]}</p>
      },
    }),
    columnHelper.accessor("age", {
      header: "سن",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("totalOrders", {
      header: "تعداد سفارش‌ها",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("totalSpent", {
      header: "مبلغ کل خرید",
      cell: (info) => {
        const amount = info.getValue() as number;
        return new Intl.NumberFormat('fa-IR').format(amount) + " ریال";
      },
    }),
    columnHelper.accessor("totalSpent", {
      header: "مبلغ کل خرید",
      cell: (info) => {
        const amount = info.getValue() as number;
        return new Intl.NumberFormat('fa-IR').format(amount) + " ریال";
      },
    }),
    columnHelper.accessor("removeUser", {
      header: "حذف کابر",
      cell: (info) => {
        return <Button style={{size:"sm"}} btn={{fn(e) {console.log(info.getValue())},text:"حذف کاربر",type:"button"}} />
      },
    }),
    columnHelper.accessor("changingRole", {
      header: "حذف کابر",
      cell: (info) => {
        const {id,original:{role:currentRole}}=info.row
        const options = [
          { label: "فروشنده", value: "vendor", icon: <FaTag/> },
          { label: "مشتری", value: "customer", icon:<BsPerson/> },
          { label: "مدیر", value: "admin", icon: <MdAdminPanelSettings/> }
        ];
        
        return <DropDown size="sm" defaultValue={currentRole}  options={options} onChange={(e)=>{console.log({id,e})}}/>
      },
    })
  ];
const Users = () => {
  return (
    <div className=' w-full h-full flex items-center justify-center'>
      <Table data={modifiedData} columns={columns}/>
    </div>
  )
}

export default Users