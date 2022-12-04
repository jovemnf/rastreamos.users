import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'servers'
})
export class Servers extends Model {

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    url_api_mobile: string | undefined;

    @Column({
        type: DataType.STRING(150),
        allowNull: false
    })
    title: string | undefined;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    uuid: string | undefined;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    access_key: string | undefined;

    @CreatedAt
    createdAt: Date | undefined;

    @UpdatedAt
    updatedAt: Date | undefined
}
