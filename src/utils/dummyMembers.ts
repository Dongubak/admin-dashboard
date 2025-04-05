export interface Member {
    id: number;
    name: string;
    gender: string;
    birth: string;
    phone: string;
    branch: string;
    memberNo: string;
    role: string;
    career: string;
    ntrp: string;
    refundAccount: string;
    refundBank: string;
    receiptInfo: string;
    receiptType: string;
    receiptNumber: string;
    trainerId: string;
    banned: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export const generateDummyData = (count: number): Member[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `홍길동${i + 1}`,
      gender: i % 2 === 0 ? '남성' : '여성',
      birth: `199${i % 10}-01-${String((i % 28) + 1).padStart(2, '0')}`,
      phone: `010-1234-${1000 + i}`,
      branch: ['강남점', '서초점', '잠실점'][i % 3],
      memberNo: `M00${i + 1}`,
      role: ['user', 'admin', 'trainer'][i % 3],
      career: `${1 + (i % 10)}년`,
      ntrp: ['2.5', '3.0', '3.5', '4.0'][i % 4],
      refundAccount: '123-456-7890',
      refundBank: '국민은행',
      receiptInfo: '개인',
      receiptType: '현금영수증',
      receiptNumber: '101-88-12345',
      trainerId: `T10${i + 1}`,
      banned: i % 7 === 0,
      createdAt: `2024-02-${String((i % 28) + 1).padStart(2, '0')}`,
      updatedAt: `2025-03-${String((i % 28) + 1).padStart(2, '0')}`,
    }));
  };
  export const dummyMembers = generateDummyData(30);
