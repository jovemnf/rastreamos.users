import { Table, Column, Model, DataType, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Servers } from "./servers";

@Table({
    tableName: 'users'
})
export class Users extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    username: string | undefined;

    @ForeignKey(() => Servers)
    @Column({
        type: DataType.INTEGER
    })
    server_id: number | undefined;

    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    cliente_id: number | undefined;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    login_id: number | undefined;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    empresa_id: number | undefined;

    @CreatedAt
    createdAt: Date | undefined;

    @UpdatedAt
    updatedAt: Date | undefined;
}
