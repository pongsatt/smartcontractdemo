import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootState, loadAccountInfo, transferToken } from '../store';

const FormItem = Form.Item;

class MyCurrency extends React.Component<FormComponentProps & ReduxProps> {
    public handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {to, amount} = values;
                this.props.transfer(to, amount);
            }
        });
    }

    public componentDidMount() {
        this.props.loadAccount();
    }

    public render() {
        const { account, token } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('account', {
                        initialValue: account
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Account" disabled={true} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('token', {
                        initialValue: token
                    })(
                        <Input prefix={<Icon type="gift" style={{ color: 'rgba(0,0,0,.25)' }} />} disabled={true} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('to', {
                        initialValue: '0xb07210851b10f884f5b4e57a8e76e717cc5cd9b496801cb93dac380747239b0f'
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="To account"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('amount', {
                        initialValue: 1
                    })(
                        <Input prefix={<Icon type="gift" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Number of token" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Transfer
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export function mapStateToProps({ mycurrency }: IRootState) {
    return {...mycurrency};
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        loadAccount: () => loadAccountInfo(dispatch),
        transfer: (to: string, amount: number) => transferToken(dispatch, to, amount)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(MyCurrency));