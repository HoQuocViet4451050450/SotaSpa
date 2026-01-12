graph LR
    subgraph Nhà_Cung_Cấp
    A[Trang trại bò sữa Vinamilk & Hộ nông dân] --> B(Nhà Máy Sản Xuất)
    A2[NCC Nguyên liệu/Bao bì Quốc tế] --> B
    end

    subgraph Sản_Xuất
    B --> C[Kho Trung Tâm/Logistic]
    end

    subgraph Phân_Phối_Bán_Buôn
    C --> D[Hệ thống nhà phân phối độc quyền]
    end

    subgraph Bán_Lẻ
    D --> E1[Siêu thị/Cửa hàng tiện lợi]
    D --> E2[Điểm bán lẻ tạp hóa]
    D --> E3[Showroom Giấc Mơ Sữa Việt]
    C --> E4[TMĐT (Web/App)]
    end

    subgraph Khách_Hàng
    E1 --> F[Người tiêu dùng cuối cùng]
    E2 --> F
    E3 --> F
    E4 --> F
    end

    %% Dòng thông tin và tài chính
    F -.->|Dòng tiền/Thông tin| E1
    E1 -.->|Dữ liệu bán hàng DMS| D
    D -.->|Đơn hàng ERP| B
