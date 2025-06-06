// Code generated by mockery v2.53.3. DO NOT EDIT.

package mocks

import (mock "github.com/stretchr/testify/mock"
)


// ClientInterface is an autogenerated mock type for the ClientInterface type
type ClientInterface struct {
	mock.Mock
}

// pongHandler provides a mock function with given fields: pongMsg
func (_m *ClientInterface) pongHandler(pongMsg string) error {
	ret := _m.Called(pongMsg)

	if len(ret) == 0 {
		panic("no return value specified for pongHandler")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(string) error); ok {
		r0 = rf(pongMsg)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// readMessage provides a mock function with no fields
func (_m *ClientInterface) readMessage() {
	_m.Called()
}

// writeMessage provides a mock function with no fields
func (_m *ClientInterface) writeMessage() {
	_m.Called()
}

// NewClientInterface creates a new instance of ClientInterface. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewClientInterface(t interface {
	mock.TestingT
	Cleanup(func())
}) *ClientInterface {
	mock := &ClientInterface{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
