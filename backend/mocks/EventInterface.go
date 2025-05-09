// Code generated by mockery v2.53.3. DO NOT EDIT.

package mocks

import mock "github.com/stretchr/testify/mock"

// EventInterface is an autogenerated mock type for the EventInterface type
type EventInterface struct {
	mock.Mock
}

// EnviarPartePalavra provides a mock function with given fields: c
func (_m *EventInterface) EnviarPartePalavra(c *ClientInterface) error {
	ret := _m.Called(c)

	if len(ret) == 0 {
		panic("no return value specified for EnviarPartePalavra")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(*ClientInterface) error); ok {
		r0 = rf(c)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// ReceberPalavras provides a mock function with given fields: c
func (_m *EventInterface) ReceberPalavras(c *ClientInterface) error {
	ret := _m.Called(c)

	if len(ret) == 0 {
		panic("no return value specified for ReceberPalavras")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(*ClientInterface) error); ok {
		r0 = rf(c)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// SendMessage provides a mock function with given fields: c
func (_m *EventInterface) SendMessage(c *ClientInterface) error {
	ret := _m.Called(c)

	if len(ret) == 0 {
		panic("no return value specified for SendMessage")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(*ClientInterface) error); ok {
		r0 = rf(c)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// conferirPalavra provides a mock function with given fields: c
func (_m *EventInterface) conferirPalavra(c *ClientInterface) error {
	ret := _m.Called(c)

	if len(ret) == 0 {
		panic("no return value specified for conferirPalavra")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(*ClientInterface) error); ok {
		r0 = rf(c)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// ready provides a mock function with given fields: c
func (_m *EventInterface) ready(c *ClientInterface) error {
	ret := _m.Called(c)

	if len(ret) == 0 {
		panic("no return value specified for ready")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(*ClientInterface) error); ok {
		r0 = rf(c)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// NewEventInterface creates a new instance of EventInterface. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewEventInterface(t interface {
	mock.TestingT
	Cleanup(func())
}) *EventInterface {
	mock := &EventInterface{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
