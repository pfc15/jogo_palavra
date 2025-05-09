// Code generated by mockery v2.53.3. DO NOT EDIT.

package mocks

import (
	http "net/http"

	mock "github.com/stretchr/testify/mock"
)

// ManagerInterface is an autogenerated mock type for the ManagerInterface type
type ManagerInterface struct {
	mock.Mock
}

// addClient provides a mock function with given fields: client
func (_m *ManagerInterface) addClient(client *ClientInterface) {
	_m.Called(client)
}

// removeClient provides a mock function with given fields: client
func (_m *ManagerInterface) removeClient(client *ClientInterface) {
	_m.Called(client)
}

// routeEvent provides a mock function with given fields: event, c
func (_m *ManagerInterface) routeEvent(event Event, c *ClientInterface) error {
	ret := _m.Called(event, c)

	if len(ret) == 0 {
		panic("no return value specified for routeEvent")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(Event, *ClientInterface) error); ok {
		r0 = rf(event, c)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// serverWS provides a mock function with given fields: w, r
func (_m *ManagerInterface) serverWS(w http.ResponseWriter, r *http.Request) {
	_m.Called(w, r)
}

// setUpHandlers provides a mock function with no fields
func (_m *ManagerInterface) setUpHandlers() {
	_m.Called()
}

// NewManagerInterface creates a new instance of ManagerInterface. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewManagerInterface(t interface {
	mock.TestingT
	Cleanup(func())
}) *ManagerInterface {
	mock := &ManagerInterface{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
